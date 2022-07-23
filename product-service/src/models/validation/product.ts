import Joi from 'joi';

const schema = Joi.object({
    title: Joi.string().required(),

    description: Joi.string().default(""),

    price: Joi.number().min(0).default(0),

    count: Joi.number().min(0).default(0),
});
export default schema;