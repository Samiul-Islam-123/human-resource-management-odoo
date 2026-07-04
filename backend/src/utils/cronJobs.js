const cron = require('node-cron');
const Attendance = require('../modules/attendance/attendance.model');
const { logger } = require('./Logger');

const getTodayBounds = () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    return { startOfDay, endOfDay };
};

const initCronJobs = () => {
    // Run at 11:59 PM every day to catch any records that were not checked out
    cron.schedule('59 23 * * *', async () => {
        try {
            const { startOfDay, endOfDay } = getTodayBounds();
            
            // Set the auto checkout time to exactly 17:00 (5 PM) today
            const checkOutTime = new Date();
            checkOutTime.setHours(17, 0, 0, 0);

            const result = await Attendance.updateMany(
                {
                    date: { $gte: startOfDay, $lte: endOfDay },
                    checkInTime: { $ne: null },
                    checkOutTime: null
                },
                {
                    $set: { checkOutTime: checkOutTime }
                }
            );

            if (result.modifiedCount > 0) {
                logger.info(`Auto checked out ${result.modifiedCount} employees who forgot to check out.`);
            }
        } catch (error) {
            logger.error(`Error running auto check-out cron job: ${error.message}`);
        }
    });
};

module.exports = { initCronJobs };
