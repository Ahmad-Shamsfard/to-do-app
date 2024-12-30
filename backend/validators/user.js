const joi = require('joi')


const signUpValidator = function (data) {
    const schema = joi.object({
        name: joi.string().min(3).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).max(15).required(),
    })
    return schema.validate(data)
}

const signInValidator = function (data) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(3).max(15).required(),
    })
    return schema.validate(data)
}
                 
module.exports = { signUpValidator,signInValidator };