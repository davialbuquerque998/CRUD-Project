import Joi from "joi";


export default Joi.object({
    name:Joi.string().min(3).max(20).required(),
    description:Joi.string().min(7).max(40).required(),
    price:Joi.number().max(10000).min(200).required(),
    isAvailable:Joi.bool().required()
});