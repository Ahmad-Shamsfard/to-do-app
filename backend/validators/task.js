const joi = require('joi')

const addListValidator = function (data) {
    const schema = Joi.object({
        task:joi.string().min(2).max(150).required()
    })
    return schema.validate(data)
}

module.exports= {addListValidator}