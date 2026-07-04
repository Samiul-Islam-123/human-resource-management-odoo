const express = require("express");
const dashboardController = require("./dashboard.controller");
const { protect, authorizeRoles } = require("../../middlewares/auth.middleware");

const dashboardRouter = express.Router();

dashboardRouter.use(protect);

dashboardRouter.get(
    "/stats",
    authorizeRoles("admin", "hr"),
    dashboardController.getDashboardStats
);

dashboardRouter.get(
    "/employee",
    dashboardController.getEmployeeStats
);

module.exports = dashboardRouter;
