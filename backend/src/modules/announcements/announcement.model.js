const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'bg-primary-100 text-primary-600',
  }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
