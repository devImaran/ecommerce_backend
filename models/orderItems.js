const mongoose = require("mongoose");

const orderItemsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        require:true
    },
    size:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const orderItemsModel =  mongoose.model('orderItems', orderItemsSchema)

module.exports = orderItemsModel
