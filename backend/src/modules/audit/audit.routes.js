const express = require('express');
const auditController = require('./audit.controller');
const { protect, authorizeRoles } = require('../../middlewares/auth.middleware');

const auditRouter = express.Router();

// Only Admins and HR can view audit logs
auditRouter.use(protect);
auditRouter.use(authorizeRoles('admin', 'hr'));

auditRouter.get('/', auditController.getAllAuditLogs);

module.exports = auditRouter;
