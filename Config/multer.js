const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "..", "/uploads");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
