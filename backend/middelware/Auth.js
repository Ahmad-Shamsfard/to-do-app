const jwt= require('jsonwebtoken')
const config = require('config')


module.exports = function(req,res,next){
    try {
        let token= req.header('toDoList-Auth-Token')
        if(!token) return res.status(403).send({message:'forbid acsses'})
        else {
            const user =jwt.verify(token,config.get('jwtPrivateKey'))
            req.user=user
            next()
        }    
    } catch (error) {
        if(!token) return res.status(403).send({message:error.message})
    }
}