const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    leaveType: {
        type: String,
        enum: ['Paid Time Off', 'Sick Leave', 'Unpaid Leave'],
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    dayType: {
        type: String,
        enum: ['Full Day', 'Half Day'],
        default: 'Full Day'
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    appliedOn: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Leave', LeaveSchema);
