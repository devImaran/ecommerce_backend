const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        require: true
    },
    postalCode: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true,
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const addressModel =  mongoose.model('addresses', addressSchema)

module.exports = addressModel
