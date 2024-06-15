const Joi = require("joi");

const queryValidation = {
  body: Joi.object().keys({
    Name: Joi.string().required().trim().not(""),
    email: Joi.string()
      .email()
      .lowercase()
      .required()
      .trim()
      .not("")
      .messages({ "string.email": `Email must be a valid email` }),
    phoneNumber: Joi.string().required().trim().not(""),
    message: Joi.string().required().trim().max(500),
  }),
};

module.exports = { queryValidation };
