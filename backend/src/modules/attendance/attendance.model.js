const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        employeeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        checkInTime: {
            type: Date,
            default: null
        },
        checkOutTime: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            enum: ["Present", "Absent", "On Leave", "Half Day"],
            default: "Absent"
        }
    },
    {
        timestamps: true
    }
);

// Compound index to ensure one attendance record per employee per day
// Commenting out index for now in case of date format issues in rapid hackathon development
// attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
