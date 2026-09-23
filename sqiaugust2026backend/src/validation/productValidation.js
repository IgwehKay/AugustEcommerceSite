const joi = require("joi");

const validateCreateProduct = (object)=>{
    const  schema = joi.object().keys({
        title: joi
        .string()
        .required()
        .error(new Error("Please provide title")),
        price: joi
        .number()
        .required()
        .min(500)
        .max(50000)
        .messages({
            "any.required": "Please provide price",
            "number.base": "Price must be a number",
            "number.min": "Price must be at least 500",
            "number.max": "Price must be no more than 50000",
        }),
        description: joi
        .string()
        .required()
        .trim()
        .error(new Error("Please provide description"))

    });

    return schema.validate(object);
};

module.exports = {validateCreateProduct}