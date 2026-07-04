const express = require('express');
const leaveController = require('./leave.controller');
const { protect, authorizeRoles } = require('../../middlewares/auth.middleware');

const leaveRouter = express.Router();

// Require authentication for all routes
leaveRouter.use(protect);

// Employee routes
leaveRouter.post('/', leaveController.requestLeave);
leaveRouter.get('/my-leaves', leaveController.getMyLeaves);

// Admin routes
leaveRouter.get('/', authorizeRoles('admin', 'hr'), leaveController.getAllLeaves);
leaveRouter.patch('/:id/status', authorizeRoles('admin', 'hr'), leaveController.updateLeaveStatus);

module.exports = leaveRouter;
