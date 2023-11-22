const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  phoneNumber: Joi.string().trim().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

exports.loginSchema = loginSchema;
exports.registerSchema = registerSchema;
