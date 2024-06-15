const userService = require("./../Services/user.services");

// SignUp user registration
const register = async (req, res, next) => {
  try {
    const data = await userService.register(req);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

//Login user
const logInUser = async (req, res, next) => {
  try {
    const data = await userService.logInUser(req);
    res.status(200).json({
      success: true,
      message: data.message,
      data: data.result,
    });
  } catch (error) {
    next(error);
  }
};

// Social media user login
const socialLogInUser = async (req, res, next) => {
  try {
    const data = await userService.socialLogIn(req);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Social media user login
const forgetPassword = async (req, res, next) => {
  try {
    const data = await userService.forgetPassword(req);
    res.status(200).json({
      success: true,
      message: "OTP has been sent via mail",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// OTP Verification
const otpVerification = async (req, res, next) => {
  try {
    const data = await userService.otpVerification(req);
    res.status(200).json({
      success: true,
      message: "Verified OTP",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Reset Password
const resetPassword = async (req, res, next) => {
  try {
    const data = await userService.resetPassword(req);
    res.status(200).json({
      success: true,
      message: "Password has been reset",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Reset Password
const deleteUser = async (req, res, next) => {
  try {
    const data = await userService.deleteUser(req);
    res.status(200).json({
      success: true,
      message: "User has been deleted",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Logout user
const logoutUser = async (req, res, next) => {
  try {
    const data = await userService.logoutUser(req);
    res.status(200).json({
      success: true,
      message: "User has been logged out successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// get user data
const getUser = async (req, res, next) => {
  try {
    const data = await userService.getUser(req);
    res.status(200).json({
      success: true,
      message: "User data retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// update user data
const updateUser = async (req, res, next) => {
  try {
    const data = await userService.updateUser(req);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// change password data
const changePassword = async (req, res, next) => {
  try {
    const data = await userService.changePassword(req);
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// upload profile image
const uploadProfileImage = async (req, res, next) => {
  try {
    const data = await userService.uploadProfileImage(req);
    res.status(200).json({
      success: true,
      message: "Profile Image uploaded successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  logInUser,
  socialLogInUser,
  forgetPassword,
  logoutUser,
  otpVerification,
  resetPassword,
  deleteUser,
  updateUser,
  changePassword,
  uploadProfileImage,
};
