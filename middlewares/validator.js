const Joi = require('joi');

const createUserValidation = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$'
        )).required().messages({
            "any.required": "First name is required",
            "string.empty": "First name cannot be empty",
            "string.pattern.base": "First name must be Letters Only, and must be at least 3 characters long"
        }),
        lastName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$'
        )).required().messages({
            "any.required": "Last name is required",
            "string.empty": "Last name cannot be empty",
            "string.pattern.base": "Last name must be Letters Only, and must be at least 3 characters long"
        }),
        email: Joi.string().trim().email().required().messages({
            "any.required": "Email is required",
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email format"
        }),
        password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')).required().messages({
            "any.required": "Password is required",
            "string.pattern.base": "Password must conatin a Uppercase, lowercase and special character, and include a digit and must be at least 8 characters long.",
            "string.empty": "Password is not allowed to be empty"
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next()

}

module.exports = {
    createUserValidation
}