const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema
const config = require('config')
let task = new Schema(({
    task: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: false,
    }
}))

let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ['En', 'Fa'],
        default: 'En'
    },
    theme: {
        type: String,
        enum: ['default', 'light', 'dark'],
        default: 'default'
    },
    password: {
        type: String,
        required: true
    },
    toDoList: [task]

})

userSchema.methods.tokenGenerator = function () {
    const data = {
        _id: this._id,
        name: this.name,
        role: "user"
    }
    return jwt.sign(data, config.get('jwtPrivateKey'))
}
module.exports = mongoose.model('user', userSchema)