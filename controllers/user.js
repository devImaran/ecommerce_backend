const userModel = require("../models/user")
const response = require("../services/response")

const getMyDetails = async (req, res, next)=>{
    try{
        const { _id } = req. user
        const isValidUser = await userModel.findById(_id).populate('address')
        const {password, ...rest} = isValidUser._doc
        if (!isValidUser) next({status : 400, message : ' User Not Found'})
        return res.send(response(200 ,'user deatils fetched successfully', rest))
    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = {
    getMyDetails
}