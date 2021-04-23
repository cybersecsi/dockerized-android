import joi from 'joi';

// Schema definition
const InstanceSchema: joi.ObjectSchema = joi.object().keys({
    instances: joi.array().items(joi.object().keys({
        name: joi.string().max(100).required(),
        address: joi.string().max(100).required(),
        core_port: joi.string().max(100).required(),
        vnc_port: joi.string().max(100).required(),
    }))
})

export default InstanceSchema;