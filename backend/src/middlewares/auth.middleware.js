const { verifyToken } = require("../utils/jwt");
const User = require("../modules/users/user.model");
const { logger } = require("../utils/Logger");

const protect = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this route. Token is missing."
            });
        }

        try {
            const decoded = await verifyToken(token);
            
            const user = await User.findById(decoded.id).select("-password");
            
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User attached to this token no longer exists."
                });
            }

            if (!user.isActive) {
                return res.status(403).json({
                    success: false,
                    message: "User account is deactivated."
                });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or expired."
            });
        }
    } catch (error) {
        logger.error(`Error in protect middleware: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Role (${req.user ? req.user.role : 'none'}) is not allowed to access this resource.`
            });
        }
        next();
    };
};

module.exports = { protect, authorizeRoles };
