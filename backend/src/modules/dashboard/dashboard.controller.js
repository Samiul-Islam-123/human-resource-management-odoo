const User = require("../users/user.model");
const Attendance = require("../attendance/attendance.model");

const getDashboardStats = async (req, res) => {
    try {
        // 1. Total Employees
        const totalEmployees = await User.countDocuments();

        // 2. Total Salary
        const salaryAggregation = await User.aggregate([
            {
                $group: {
                    _id: null,
                    totalSalary: { $sum: "$salary" }
                }
            }
        ]);
        const totalSalary = salaryAggregation.length > 0 ? salaryAggregation[0].totalSalary : 0;

        // 3. Active Employees
        const activeEmployees = await User.countDocuments({ isActive: true });

        // 4. Average Check-In Time (Today)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendanceAggregation = await Attendance.aggregate([
            {
                $match: {
                    date: { $gte: today },
                    checkInTime: { $ne: null }
                }
            },
            {
                $project: {
                    checkInHour: { $hour: "$checkInTime" },
                    checkInMinute: { $minute: "$checkInTime" }
                }
            },
            {
                $group: {
                    _id: null,
                    avgHour: { $avg: "$checkInHour" },
                    avgMinute: { $avg: "$checkInMinute" },
                    count: { $sum: 1 }
                }
            }
        ]);

        let averageCheckIn = "--:--";
        if (attendanceAggregation.length > 0 && attendanceAggregation[0].count > 0) {
            const h = Math.round(attendanceAggregation[0].avgHour).toString().padStart(2, '0');
            const m = Math.round(attendanceAggregation[0].avgMinute).toString().padStart(2, '0');
            averageCheckIn = `${h}:${m} AM`;
        }

        return res.status(200).json({
            success: true,
            data: {
                totalEmployees,
                totalSalary,
                activeEmployees,
                averageCheckIn
            }
        });

    } catch (error) {
        console.error("Error in getDashboardStats:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard stats",
            error: error.message
        });
    }
};

const getEmployeeStats = async (req, res) => {
    try {
        const employeeId = req.user._id;
        
        // 1. Get recent attendance
        const recentAttendance = await Attendance.find({ employeeId })
            .sort({ date: -1 })
            .limit(5);

        // 2. Calculate hours worked this week
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday
        startOfWeek.setHours(0,0,0,0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23,59,59,999);

        const weekAttendance = await Attendance.find({
            employeeId,
            date: { $gte: startOfWeek, $lte: endOfWeek }
        });

        let hoursWorkedThisWeek = 0;
        weekAttendance.forEach(att => {
            if (att.checkInTime && att.checkOutTime) {
                const diffMs = att.checkOutTime - att.checkInTime;
                hoursWorkedThisWeek += diffMs / (1000 * 60 * 60);
            }
        });

        // 3. Get today's status
        const todayStart = new Date();
        todayStart.setHours(0,0,0,0);
        const todayAtt = await Attendance.findOne({ employeeId, date: { $gte: todayStart } });
        const todayStatus = todayAtt ? todayAtt.status : 'ABSENT';

        return res.status(200).json({
            success: true,
            data: {
                hoursWorkedThisWeek: hoursWorkedThisWeek.toFixed(1),
                todayStatus,
                recentAttendance
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch employee stats",
            error: error.message
        });
    }
};

module.exports = {
    getDashboardStats,
    getEmployeeStats
};
