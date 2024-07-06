import Joi from '@hapi/joi'

export const signupValidation=(data)=>{
    const schema= Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(10).required(),
    });
    return schema.validate(data);

}

export const loginValidation=(data)=>{
    const schema= Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(15).required(),
    });
    return schema.validate(data);

}