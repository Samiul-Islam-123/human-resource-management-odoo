const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
