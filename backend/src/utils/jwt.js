const jwt = require("jsonwebtoken");
const { logger } = require("./Logger");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

async function generateToken(payload) {
    try {
        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        return token;
    } catch (error) {
        logger.error(`Error while generating JWT token: ${error.message}`);
        throw error;
    }
}

async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        logger.error(`Error while verifying JWT token: ${error.message}`);
        throw error;
    }
}

module.exports = {
    generateToken,
    verifyToken
};