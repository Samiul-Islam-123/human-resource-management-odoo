const express = require("express");
const authController = require("./auth.controller");
const { protect } = require("../../middlewares/auth.middleware");

const authRouter = express.Router();

// Login
authRouter.post("/login", authController.login);

module.exports = authRouter;
