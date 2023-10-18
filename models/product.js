const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxLen:100
    },
    description: {
        type: String,
        require: true,
    },
    brand:{
        type:String
    },
    price:{
        type:Number,
        require:true
    },
    details:[{
        type: String
    }],
    color:[{
        name:{ type: String},
        quantity:{ type: Number},
    }],
    size:[{
        name:{ type: String},
        quantity:{ type: Number},
    }],
    images:[{
        type:String
    }],
    reviewsAndRatings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reviewsAndRatings'
    }],
    addedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
}, {
    timestamps:true
})

const productsModel =  mongoose.model('products', productsSchema)

module.exports = productsModel
