const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),
    password: Joi.string()
        .min(6)
        .max(100)
        .required()
});

module.exports.loginSchema = loginSchema;
