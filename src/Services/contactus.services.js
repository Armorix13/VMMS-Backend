const ContactUs = require("../Model/contactus.model");

const sendQuery = async (req) => {
  try {
    const query = new ContactUs(req.body);
    await query.save();
    return query;
  } catch (error) {
    throw error;
  }
};

// upload  image video pdf audio
const upload = async (req, res, next) => {
  try {
    if (req && req.file.filename == undefined)
      throw new Error("No file uploaded");
    console.log(req.file);
    res.status(200).json({
      success: true,
      message: "image upload successfully",
      url: `${process.env.BASE_URL}${
        req.file.destination.split("src/view")[1]
      }/${req.file.filename.trim().replace(/\s+/g, "_")}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendQuery, upload };
