const jwt = require('jsonwebtoken')
require('dotenv').config()

const authentication= async (req, res, next)=>{
    try{
        //split tyhe bearer and get the token only 
        const token = req.headers.authorization?.split(" ")[1] 
        if (!token) return next({status:401, message:"Token not found!"})

        const isValidToken  =  jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        if(!isValidToken) return next({status:401, message:"Unauthorized"})

        if (isValidToken.exp > Date.now()) return next({status:401, message:"Token has Expired!"})

        req.user = isValidToken
        next()

    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = authentication