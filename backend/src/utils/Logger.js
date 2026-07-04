const fs = require("fs");
const path = require("path");

// Log file configuration
const LOG_DIR = path.join(process.cwd(), "logs");
const LOG_FILE = path.join(LOG_DIR, "app.log");

// Create logs directory if it doesn't exist
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Persistent write stream
const logStream = fs.createWriteStream(LOG_FILE, {
    flags: "a",
    encoding: "utf8"
});

const COLORS = {
    INFO: "\x1b[36m",
    SUCCESS: "\x1b[32m",
    WARN: "\x1b[33m",
    ERROR: "\x1b[31m",
    RESET: "\x1b[0m"
};

function getCallerFile() {
    const originalPrepareStackTrace = Error.prepareStackTrace;

    try {
        const err = new Error();

        Error.prepareStackTrace = (_, stack) => stack;

        const stack = err.stack;

        for (let i = 2; i < stack.length; i++) {
            const fileName = stack[i]?.getFileName();

            if (
                fileName &&
                !fileName.includes("logger.js")
            ) {
                return path.relative(
                    process.cwd(),
                    fileName
                );
            }
        }

        return "unknown";
    } catch {
        return "unknown";
    } finally {
        Error.prepareStackTrace = originalPrepareStackTrace;
    }
}

function normalizeMessage(message) {
    if (message instanceof Error) {
        return {
            message: message.message,
            stack: message.stack
        };
    }

    if (typeof message === "object" && message !== null) {
        try {
            return JSON.stringify(message, null, 2);
        } catch {
            return String(message);
        }
    }

    return String(message);
}

function writeLog(level, message) {
    const normalizedMessage = normalizeMessage(message);

    const log = {
        timestamp: new Date().toISOString(),
        level,
        file: getCallerFile(),
        message: normalizedMessage
    };

    logStream.write(
        JSON.stringify(log) + "\n"
    );

    const color =
        COLORS[level] || COLORS.RESET;

    console.log(
        `${color}[${level}]${COLORS.RESET} ` +
        `[${log.timestamp}] ` +
        `${log.file}: ` +
        `${color}${
            typeof normalizedMessage === "string"
                ? normalizedMessage
                : JSON.stringify(
                    normalizedMessage,
                    null,
                    2
                )
        }${COLORS.RESET}`
    );
}

const logger = {
    info(msg) {
        writeLog("INFO", msg);
    },

    success(msg) {
        writeLog("SUCCESS", msg);
    },

    warn(msg) {
        writeLog("WARN", msg);
    },

    error(msg) {
        writeLog("ERROR", msg);
    }
};

process.on("exit", () => {
    logStream.end();
});

process.on("SIGINT", () => {
    logStream.end();
    process.exit();
});

process.on("SIGTERM", () => {
    logStream.end();
    process.exit();
});

module.exports = { logger };