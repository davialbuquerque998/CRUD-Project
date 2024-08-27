import Joi from "joi";

// Define a Joi schema for validating product data
export default Joi.object({
    // 'name' field: a string with a minimum length of 3 and a maximum length of 20, required
    name: Joi.string().min(3).max(20).required(),

    // 'description' field: a string with a minimum length of 7 and a maximum length of 40, required
    description: Joi.string().min(7).max(40).required(),

    // 'price' field: a number with a minimum value of 200 and a maximum value of 10,000, required
    price: Joi.number().max(100000).min(20).required(),

    // 'isAvailable' field: a boolean value indicating availability, required
    isAvailable: Joi.bool().required()
});
