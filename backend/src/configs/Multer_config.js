const multer = require("multer");

const storage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed."));
    }
};

const documentFilter = (req, file, cb) => {

    const allowed = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid document type."));
    }
};

const uploadImage = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

const uploadDocument = multer({
    storage,
    fileFilter: documentFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

module.exports = {
    uploadImage,
    uploadDocument
};