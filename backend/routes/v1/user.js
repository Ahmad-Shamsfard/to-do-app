const express = require('express')
let router = express.Router()
const { signUpValidator,signInValidator } = require('../../validators/user')
const userModel = require('../../models/user')
const bcrypt = require('bcrypt')
const _ = require('lodash')
router.post('/signup', (req, res) => {
    // const { error } = registorValidator(req.body)
    // if (error) return res.status(400).send({ message: error.message })
    console.log("req.body",req.body)
    let checkSignUpinpute  = signUpValidator(req.body)
    
    if (checkSignUpinpute.error) res.status(400).send({ message: checkSignUpinpute?.error?.message })
    else {
        userModel.findOne({ email: req.body.email }).then(async (newUser) => {
            if (newUser) {
                res.status(400).send({ message: 'duplicate user' })
            }
            else {
                let salt = await bcrypt.genSalt(10)
                let password = await bcrypt.hash(req.body.password, salt)
                let user = new userModel(_.pick(req.body,[
                    'name',
                    'email'
                ]))
                user.password = password
                user.save().then(newUser => {
                    let token = newUser.tokenGenerator()
                    res.status(200).send({ message: 'you got this ', user: newUser, token: token })
                }).catch(err => {
                    res.status(400).send({ message: err.message })
                })
            }
        })
    }
})

router.post('/login', (req, res) => {
    let  checkSignInInput  = signInValidator(req.body)
    if (checkSignInInput.error) 
        res.status(400).send({ message: checkSignInInput.error?.message })
    else {
        userModel.findOne({email:req.body.email}).then(async(user)=>{
            if (user){
                console.log(user);
                
                 bcrypt.compare(req.body.password, user.password).then((checkpass)=>{
                    console.log(checkpass);
                    
                    if(checkpass) {
                        let token = user.tokenGenerator()
                        res.status(200).send({ message: 'you got this ', user: user, token: token })
                    }else{
                        res.status(400).send({ message: 'wrong information ' })
                    }
                 })
            }else res.status(400).send({ message: 'wrong information ' })
        })
    }
})


module.exports = router