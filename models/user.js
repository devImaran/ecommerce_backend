const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique:true
    },
    password: {
        type: String,
        require: true,
    },
    profilePic: {
        type: String,
        require: false
    },
    phoneNumber:{
        type:String,
        require:true,
        unique:true
    },
    role:{
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'addresses'
    }],
    paymentInformation:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'payemntInformations'
    }],
    reviewsAndRatings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reviewsAndRatings'
    }],
    // review:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'productReviews'
    // }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const userModel =  mongoose.model('users', userSchema)

module.exports = userModel
