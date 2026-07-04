const Leave = require('./leave.model');
const User = require('../users/user.model');
const AuditLog = require('../audit/audit.model');
const { logger } = require('../../utils/Logger');

const calculateDays = (start, end, dayType) => {
    if (dayType === 'Half Day') return 0.5;
    const diffTime = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
};

const requestLeave = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, dayType, reason } = req.body;

        const newLeave = await Leave.create({
            employeeId: req.user._id,
            leaveType,
            startDate,
            endDate,
            dayType,
            reason
        });

        res.status(201).json({
            success: true,
            message: "Leave requested successfully",
            data: newLeave
        });

    } catch (error) {
        logger.error(`Error requesting leave: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to request leave" });
    }
};

const getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ employeeId: req.user._id }).sort({ appliedOn: -1 });
        res.status(200).json({ success: true, data: leaves });
    } catch (error) {
        logger.error(`Error fetching my leaves: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to fetch leaves" });
    }
};

const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate('employeeId', 'firstName lastName employeeId profilePicture')
            .sort({ appliedOn: -1 });
        res.status(200).json({ success: true, data: leaves });
    } catch (error) {
        logger.error(`Error fetching all leaves: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to fetch all leaves" });
    }
};

const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // 'Approved' or 'Rejected'

        const leave = await Leave.findById(id).populate('employeeId');
        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave request not found" });
        }

        if (leave.status !== 'Pending') {
            return res.status(400).json({ success: false, message: `Leave is already ${leave.status}` });
        }

        leave.status = status;
        await leave.save();

        let daysDeducted = 0;
        if (status === 'Approved') {
            daysDeducted = calculateDays(leave.startDate, leave.endDate, leave.dayType);
            const user = await User.findById(leave.employeeId._id);
            user.leaveBalance -= daysDeducted;
            await user.save();
        }

        // Create Audit Log
        await AuditLog.create({
            action: `Leave ${status}`,
            description: `Leave request for ${leave.employeeId.firstName} ${leave.employeeId.lastName} was ${status.toLowerCase()}.${status === 'Approved' ? ` Deducted ${daysDeducted} days.` : ''}`,
            performedBy: req.user._id,
            targetUser: leave.employeeId._id
        });

        res.status(200).json({
            success: true,
            message: `Leave request ${status.toLowerCase()}`,
            data: leave
        });

    } catch (error) {
        logger.error(`Error updating leave status: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to update leave status" });
    }
};

module.exports = {
    requestLeave,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus
};
