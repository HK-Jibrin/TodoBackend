const Joi = require("joi");

const signupValidation = (data) => {
  const schema = {
    first_name: Joi.string().min(4).max(50).trim().required(),
    last_name: Joi.string().trim().min(4).max(50).required(),
    email: Joi.string().email().min(5).max(150).trim().required(),
    password: Joi.string().min(6).required(),
    Admin: Joi.number().integer().max(6).required(),
  };
  return Joi.validate(data, schema);
};
module.exports = signupValidation;