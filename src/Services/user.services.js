require("dotenv").config();
const baseURL = process.env.BASE_URL;
const mongoose = require("mongoose");
const User = require("./../Model/users.model");
const otpGenerator = require("otp-generator");
const sendMail = require("../Utils/sendMail");
const bcrypt = require("bcryptjs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { TOO_MANY_REQUESTS } = require("http-status");
const { log } = require("console");

const register = async (req, res) => {
  console.log(req.body);
  const { email, password, ...otherData } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error(`Email ${email}  already exist`);
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const data = new User({
        ...otherData,
        email,
        password: encryptedPassword,
        isActive: true,
      });
      await data.save();
      const token = jwt.sign({ _id: data.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      const userData = await User.findOne({ email: email }, { password: 0 });
      const newData = { ...userData.toJSON(), token };
      return newData;
    }
  } catch (error) {
    throw error;
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password, deviceType, deviceToken } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    if (!user.password && user.socialId) {
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      const updatedUser = await User.findOneAndUpdate(
        { email: email },
        { otp: otp },
        { new: true }
      );
      const to = email;
      const subject = "OTP to reset password";
      const text = `${otp} is your OTP to reset your password`;
      const vEmail = await sendMail(to, subject, text);
      const data = {
        message: "You have different login way",
        result: "Please check email to login and set your password",
      };
      return data;
    }
    const hashedPassword = user.password;
    const compare = await bcrypt.compare(password, hashedPassword);
    if (compare) {
      const updateUser = await User.findOneAndUpdate(
        { _id: user.id },
        { deviceType: deviceType, deviceToken: deviceToken, isActive: true },
        { new: true }
      );
      const token = jwt.sign({ _id: updateUser.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      const userData = await User.findOne(
        { email: email },
        { password: 0, otp: 0 }
      );
      if (userData.profileImage) {
        userData.profileImage = `${baseURL}image/${userData.profileImage}`;
      }
      const data = {
        message: "User Login successfully",
        result: { ...userData.toJSON(), token },
      };
      return data;
    } else {
      throw new Error("Password is incorrect.");
    }
  } catch (err) {
    throw err;
  }
};

const socialLogIn = async (req, res) => {
  try {
    const { socialId, email, Name } = req.body;
    const userEmail = await User.findOne({ email: email });
    if (userEmail) {
      if (userEmail.deactivatedByAdmin) {
        throw new Error(
          "User is deactivated by admin. Please contact with admin"
        );
      }
    }

    const user = await User.findOne({ socialId: socialId });
    if (!user) {
      if (await User.findOne({ email: email })) {
        const updateUser = await User.findOneAndUpdate(
          { email: email },
          { socialId: socialId, isLogout: false },
          { new: true }
        );
        const token = jwt.sign({ _id: updateUser.id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        const data = { ...updateUser.toJSON, token };
        return data;
      }
      if (await User.findOne({ Name: Name })) {
        const updateUser = await User.findOneAndUpdate(
          { Name: Name },
          { socialId: socialId },
          { new: true }
        );
        const token = jwt.sign({ _id: updateUser.id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        const data = { ...updateUser.toJSON(), token };
        return data;
      }
      const newUser = new User(req.body);
      await newUser.save();
      const token = jwt.sign({ _id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      const data = { ...newUser.toJSON(), token };
      return data;
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: user._id },
      req.body,
      { new: true }
    );
    if (updateUser.profileImage) {
      updateUser.profileImage = `${baseURL}image/${updateUser.profileImage}`;
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const data = { ...updateUser.toJSON(), token };
    return data;
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.auth;
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User Not Found");
    }
    const deletedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        email: null,
        phoneNumber: null,
        socialId: null,
        isDeleted: true,
        otp: null,
      }
    );
    return;
  } catch (error) {
    const response = error;
    throw response;
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User does not exist");
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { otp: otp },
      { new: true }
    );
    const to = email;
    const subject = "OTP to reset password";
    const text = `${otp} is your OTP to reset your password`;
    const vEmail = await sendMail(to, subject, text);
    const data = "Please check email";
    return data;
  } catch (err) {
    throw err;
  }
};

const otpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User does not exist");
    if (user.otp == otp) {
      const data = `${user._id}`;
      return data;
    }
    throw new Error("Invalid OTP");
  } catch (err) {
    throw err;
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, id, otp } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) throw new Error("User does not exist");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updateUser = await User.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword },
      { new: true }
    );
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const userData = await User.findById({ _id: id }, { password: 0, otp: 0 });
    if (userData.profileImage) {
      userData.profileImage = `${baseURL}image/${userData.profileImage}`;
    }
    return { userData, token };
  } catch (err) {
    throw err;
  }
};

const logoutUser = async (req, res) => {
  try {
    const id = req.auth;
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User Not Found");
    }
    const loggedOutUser = await User.findOneAndUpdate(
      { _id: id },
      { deviceToken: null, deviceType: null, isActive: false },
      { new: true }
    );
    return;
  } catch (error) {
    const response = error;
    throw response;
  }
};

// Helper function to remove empty string and null values from an object
const removeEmptyValues = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      newObj[key] = removeEmptyValues(obj[key]); // Recursively remove empty string and null values from nested objects
    } else if (obj[key] !== "" && obj[key] !== null) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

const updateUser = async (req, res) => {
  try {
    req.body = removeEmptyValues(req.body);
    const id = req.auth;
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User Not Found");
    }

    if (req.file) {
      req.body.profileImage = req.file.filename;
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // Check if updatedUser.profileImage is not null, empty string, or undefined before adding baseURL
    if (updatedUser.profileImage) {
      updatedUser.profileImage = `${baseURL}image/${updatedUser.profileImage}`;
    }

    // Omit the password field from the response
    const { password, ...otherData } = updatedUser.toJSON();
    const data = { ...otherData };

    return data;
  } catch (error) {
    throw error;
  }
};

//img.replace(/\\/g, "/");
//data.concat(rating, getData);
const changePassword = async (req, res) => {
  try {
    const id = req.auth;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User Not Found");
    }
    const compare = await bcrypt.compare(currentPassword, user.password);
    if (!compare) {
      throw new Error("Password is incorrect");
    }
    if (newPassword !== currentPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        { password: hashedPassword },
        { new: true }
      );
      if (updatedUser.profileImage) {
        updatedUser.profileImage = `${baseURL}image/${updatedUser.profileImage}`;
      }
      const { password: dataPassword, ...otherdata } = updatedUser.toJSON();
      const data = { ...otherdata };
      return data;
    }
    throw new Error("Please enter different password");
  } catch (error) {
    const response = error;
    throw response;
  }
};

//Upload category image
const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send("No Image uploaded.");
      return;
    }
    const id = req.auth;
    const userData = await User.findOne({ _id: id });
    if (!userData) throw new Error("User not found");
    const editedUser = await User.findOneAndUpdate(
      { _id: id },
      { profileImage: req.file.filename },
      { new: true }
    );
    if (editedUser.profileImage) {
      editedUser.profileImage = `${baseURL}image/${editedUser.profileImage}`;
    }
    const { password: dataPassword, ...otherdata } = editedUser.toJSON();
    const data = { ...otherdata };
    return data;
  } catch (error) {
    const response = error;
    throw response;
  }
};
module.exports = {
  register,
  logInUser,
  socialLogIn,
  otpVerification,
  resetPassword,
  deleteUser,
  logoutUser,
  updateUser,
  changePassword,
  uploadProfileImage,
};
