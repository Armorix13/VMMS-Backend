const Joi = require("joi");

const registerValidation = {
  body: Joi.object().keys({
    Name: Joi.string().required().trim().not(""),
    email: Joi.string()
      .email()
      .lowercase()
      .required()
      .trim()
      .not("")
      .messages({ "string.email": `Email must be a valid email` }),
    password: Joi.string().min(7).max(30).required().trim().not("").messages({
      "string.min": `Password length must be at least 7 characters long`,
      "string.max": `Password length must be less than or equal to 30 characters long`,
    }),
    currentPassword: Joi.string()
      .min(7)
      .max(30)
      .required()
      .trim()
      .not("")
      .messages({
        "string.min": `Password length must be at least 7 characters long`,
        "string.max": `Password length must be less than or equal to 30 characters long`,
      }),
    location: Joi.string().optional().trim().not(""),
    deviceToken: Joi.string().optional().trim().not(""),
    deviceType: Joi.number().optional(),
    role: Joi.string().empty(""),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .lowercase()
      .required()
      .trim()
      .not("")
      .messages({ "string.email": `Email must be a valid email` }),
    password: Joi.string().min(7).max(30).required().trim().not("").messages({
      "string.min": `Password length must be at least 7 characters long`,
      "string.max": `Password length must be less than or equal to 30 characters long`,
    }),
    deviceToken: Joi.string().optional().trim().not(""),
    deviceType: Joi.number().optional(),
  }),
};

const forgetPasswordValidation = {
  body: Joi.object().keys({
    email: Joi.string()
      .email()
      .lowercase()
      .required()
      .trim()
      .not("")
      .messages({ "string.email": `Email must be a valid email` }),
  }),
};

const deleteUserValidation = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

const logoutUserValidation = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
};

const otpVerificationValidation = {
  body: Joi.object().keys({
    otp: Joi.required(),
    email: Joi.string()
      .email()
      .lowercase()
      .required()
      .trim()
      .not("")
      .messages({ "string.email": `Email must be a valid email` }),
  }),
};

const resetPasswordValidation = {
  body: Joi.object().keys({
    id: Joi.string().required().trim().not(""),
    newPassword: Joi.string()
      .min(7)
      .max(30)
      .required()
      .trim()
      .not("")
      .messages({
        "string.min": `Password length must be at least 7 characters long`,
        "string.max": `Password length must be less than or equal to 30 characters long`,
      }),
  }),
};

const socialValidation = {
  body: Joi.object().keys({
    socialId: Joi.string().empty("").trim(),
    userName: Joi.string().empty(""),
    deviceToken: Joi.string().empty(""),
    deviceType: Joi.number().empty(""),
    email: Joi.string()
      .empty("")
      .trim()
      .email({ tlds: { allow: false } })
      .lowercase()
      .messages({
        "string.email": "Email must be a valid email or an empty string",
      }),
  }),
};

const editUserValidation = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    userName: Joi.string(),
    phoneNumber: Joi.number(),
    profileImage: Joi.string().optional().empty(""),
    about: Joi.string(),
    location: Joi.string(),
  }),
};

const updateUserValidation = {
  body: Joi.object().keys({
    userName: Joi.string().optional().empty(""),
    phoneNumber: Joi.number().optional().empty(""),
    profileImage: Joi.string().optional().empty(""),
    about: Joi.string().optional().empty(""),
    location: Joi.string().optional().empty(""),
  }),
};

const changePasswordValidation = {
  body: Joi.object().keys({
    currentPassword: Joi.string()
      .min(7)
      .max(30)
      .required()
      .trim()
      .not("")
      .messages({
        "string.min": `Password length must be at least 7 characters long`,
        "string.max": `Password length must be less than or equal to 30 characters long`,
      }),
    newPassword: Joi.string()
      .min(7)
      .max(30)
      .required()
      .trim()
      .not("")
      .messages({
        "string.min": `Password length must be at least 7 characters long`,
        "string.max": `Password length must be less than or equal to 30 characters long`,
      }),
  }),
};

module.exports = {
  registerValidation,
  loginValidation,
  socialValidation,
  resetPasswordValidation,
  otpVerificationValidation,
  forgetPasswordValidation,
  logoutUserValidation,
  updateUserValidation,
  changePasswordValidation,
  editUserValidation,
};
