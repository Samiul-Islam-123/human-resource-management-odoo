const bcrypt = require("bcryptjs");
const User = require("../users/user.model");
const { generateToken } = require("../../utils/jwt");
const { logger } = require("../../utils/Logger");

const login = async (req, res) => {
    try {
        const { email, employeeId, password } = req.body;

        const loginId = email || employeeId;

        if (!loginId || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide login ID and password."
            });
        }

        const query = {};
        if (loginId.includes('@')) {
            query.email = loginId.toLowerCase().trim();
        } else {
            query.employeeId = loginId.trim().toUpperCase();
        }

        const user = await User.findOne(query);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "Your account is deactivated. Please contact HR."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials."
            });
        }

        const token = await generateToken({
            id: user._id,
            employeeId: user.employeeId,
            role: user.role
        });

        const userData = user.toObject();
        delete userData.password;

        res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            data: {
                token,
                user: userData
            }
        });

    } catch (error) {
        logger.error(`Error during login: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Login failed."
        });
    }
};

module.exports = {
    login
};
