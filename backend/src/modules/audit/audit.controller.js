const AuditLog = require('./audit.model');
const { logger } = require('../../utils/Logger');

const getAllAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find()
            .populate('performedBy', 'firstName lastName employeeId')
            .populate('targetUser', 'firstName lastName employeeId')
            .sort({ date: -1 });
            
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        logger.error(`Error fetching audit logs: ${error.message}`);
        res.status(500).json({ success: false, message: "Failed to fetch audit logs" });
    }
};

module.exports = {
    getAllAuditLogs
};
