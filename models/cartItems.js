const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
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
    quantity:{
        type:Number,
        require:true,
        default:1
    },
    price:{
        type:Number,
        require:true,
        default:0
    },
    size:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const cartItemsModel =  mongoose.model('cartItems', cartItemsSchema)

module.exports = cartItemsModel
    