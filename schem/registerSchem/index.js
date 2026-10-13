const Joi = require('joi');

const registerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),
    email: Joi.string()
        .min(6)
        .max(25)
        .trim()
        .lowercase()
        .email()
        .required(),
    password: Joi.string()
        .min(8)
        .max(100)
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/)
        .required()
        .messages({
            'string.pattern.base': 'Password must contain uppercase, lowercase, number and special character'
        })
});

module.exports.registerSchema = registerSchema;
