const mongoose = require("mongoose");

const contactusSchema = new mongoose.Schema(
  {
    Name: { type: String, default: null },
    phoneNumber: { type: Number, default: null },
    email: { type: String, default: null },
    message: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const ContactUs = mongoose.model("contactus", contactusSchema);

module.exports = ContactUs;
