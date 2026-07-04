const express = require("express");
const attendanceController = require("./attendance.controller");
const { protect } = require("../../middlewares/auth.middleware");

const attendanceRouter = express.Router();

// All routes require authentication
attendanceRouter.use(protect);

attendanceRouter.post("/check-in", attendanceController.checkIn);
attendanceRouter.post("/check-out", attendanceController.checkOut);
attendanceRouter.get("/status", attendanceController.getStatus);
attendanceRouter.get("/my-records", attendanceController.getMyRecords);

module.exports = attendanceRouter;
