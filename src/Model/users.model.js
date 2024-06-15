const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: { type: String, default: null },
    gender: { type: Number, default: null }, //Female:1,Male:2
    phoneNumber: { type: Number, default: null },
    email: { type: String, default: null },
    password: { type: String, default: null },
    location: { type: String, default: null },
    socialId: { type: String, default: null },
    profileImage: { type: String, default: null },
    deviceToken: { type: String, default: null },
    deviceType: { type: Number, default: null }, //1=android,2=ios
    isActive: { type: Boolean, default: true },
    otp: { type: String, default: null },
    about: { type: String, default: null },
    role: { type: Number, default: 0 }, //0=user,1=Admin
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);

module.exports = User;
