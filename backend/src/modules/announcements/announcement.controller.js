const Announcement = require('./announcement.model.js');
const {logger} = require('../../utils/Logger.js');

const createAnnouncement = async (req, res) => {
  try {
    const { title, desc, color } = req.body;
    const author = req.user ? `${req.user.firstName} ${req.user.lastName}` : 'Admin';

    const newAnnouncement = await Announcement.create({
      title,
      desc,
      author,
      color: color || 'bg-primary-100 text-primary-600'
    });

    res.status(201).json({
      success: true,
      data: newAnnouncement
    });
  } catch (error) {
    logger.error(`Error creating announcement: ${error.message}`);
    res.status(500).json({ success: false, message: "Failed to create announcement" });
  }
};

const getAnnouncements = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      data: announcements
    });
  } catch (error) {
    logger.error(`Error fetching announcements: ${error.message}`);
    res.status(500).json({ success: false, message: "Failed to fetch announcements" });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    await Announcement.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully'
    });
  } catch (error) {
    logger.error(`Error deleting announcement: ${error.message}`);
    res.status(500).json({ success: false, message: "Failed to delete announcement" });
  }
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncement
};
