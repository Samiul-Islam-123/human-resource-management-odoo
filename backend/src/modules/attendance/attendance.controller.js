const Attendance = require("./attendance.model");
const { logger } = require("../../utils/Logger");

const getTodayBounds = () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    return { startOfDay, endOfDay };
};

// POST /attendance/check-in
const checkIn = async (req, res) => {
    try {
        const { startOfDay, endOfDay } = getTodayBounds();

        let attendance = await Attendance.findOne({
            employeeId: req.user._id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (attendance) {
            if (attendance.checkInTime) {
                return res.status(400).json({ success: false, message: "Already checked in today" });
            }
            // Update existing record
            attendance.checkInTime = new Date();
            attendance.status = "Present";
            await attendance.save();
        } else {
            // Create new record
            attendance = await Attendance.create({
                employeeId: req.user._id,
                date: new Date(),
                checkInTime: new Date(),
                status: "Present"
            });
        }

        res.status(200).json({
            success: true,
            message: "Checked in successfully",
            data: attendance
        });

    } catch (error) {
        logger.error(`Error during check-in: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to check in" });
    }
};

// POST /attendance/check-out
const checkOut = async (req, res) => {
    try {
        const { startOfDay, endOfDay } = getTodayBounds();

        const attendance = await Attendance.findOne({
            employeeId: req.user._id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        if (!attendance || !attendance.checkInTime) {
            return res.status(400).json({ success: false, message: "Must check in first" });
        }

        if (attendance.checkOutTime) {
            return res.status(400).json({ success: false, message: "Already checked out today" });
        }

        attendance.checkOutTime = new Date();
        await attendance.save();

        res.status(200).json({
            success: true,
            message: "Checked out successfully",
            data: attendance
        });

    } catch (error) {
        logger.error(`Error during check-out: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to check out" });
    }
};

// GET /attendance/status
const getStatus = async (req, res) => {
    try {
        const { startOfDay, endOfDay } = getTodayBounds();

        const attendance = await Attendance.findOne({
            employeeId: req.user._id,
            date: { $gte: startOfDay, $lte: endOfDay }
        });

        let status = 'absent';
        let checkInTime = null;
        let checkOutTime = null;

        if (attendance) {
            if (attendance.status === 'On Leave') {
                status = 'on-leave';
            } else if (attendance.checkInTime && !attendance.checkOutTime) {
                status = 'checked-in';
            } else if (attendance.checkOutTime) {
                status = 'absent'; // Checked out
            }
            
            if (attendance.checkInTime) {
                checkInTime = new Date(attendance.checkInTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            }
            if (attendance.checkOutTime) {
                checkOutTime = new Date(attendance.checkOutTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            }
        }

        res.status(200).json({
            success: true,
            data: {
                status,
                checkInTime,
                checkOutTime
            }
        });

    } catch (error) {
        logger.error(`Error fetching status: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to fetch status" });
    }
};

// GET /attendance/my-records
const getMyRecords = async (req, res) => {
    try {
        const records = await Attendance.find({ employeeId: req.user._id })
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            data: records
        });
    } catch (error) {
        logger.error(`Error fetching attendance records: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to fetch attendance records" });
    }
};

module.exports = {
    checkIn,
    checkOut,
    getStatus,
    getMyRecords
};
