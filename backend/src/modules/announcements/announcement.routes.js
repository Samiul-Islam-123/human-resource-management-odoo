const express = require('express');
const { protect, authorizeRoles } = require('../../middlewares/auth.middleware');
const { createAnnouncement, getAnnouncements, deleteAnnouncement } = require('./announcement.controller.js');

const router = express.Router();

router.use(protect);

router.get('/', getAnnouncements);
router.post('/', authorizeRoles('admin', 'hr'), createAnnouncement);
router.delete('/:id', authorizeRoles('admin', 'hr'), deleteAnnouncement);

module.exports = router;
