const Joi = require('joi');

const validationSchema = {
  id: Joi.number().min(1).required(),
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
  password: Joi.string().min(8).required(),
  token: Joi.string().max(200).required(),
  rememberMe: Joi.boolean().default(false),
};

module.exports = {
  createUser: {
    body: Joi.object({
      name: validationSchema.name,
      email: validationSchema.email,
      phoneNumber: validationSchema.phoneNumber, 
      password: validationSchema.password,
    }),
  },
  loginUser: {
    body: Joi.object({
        email: validationSchema.email,
        password: validationSchema.password,
        rememberMe: validationSchema.rememberMe,
    }),
  },
};
