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

exports.registerSchema = registerSchema;
