const multer = require("multer");
const fs = require("fs");
const otpGenerator = require("otp-generator");

// Define directories for image and PDF uploads
const imgDir = "src/view/img";
const pdfDir = "src/view/pdf";

// Ensure the directories exist
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// Define storage strategy for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileExtension = file.mimetype.split("/")[1];
    let targetDir = imgDir; // Default directory for images

    // Check the file type and set the target directory accordingly
    if (file.mimetype === "application/pdf") {
      targetDir = pdfDir;
    } else if (["jpeg", "jpg", "png", "gif"].includes(fileExtension)) {
      targetDir = imgDir;
    }

    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    const extArray = file.mimetype.split("/");
    const extension = extArray[extArray.length - 1];

    // Generate a unique filename
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });

    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
