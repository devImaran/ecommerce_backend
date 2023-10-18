const mongoose = require("mongoose");

const userCartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true
    },
    cartItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cartItems',
        require:true
    }],
    // totalPrice:{
    //     type:Number,
    //     require:true,
    //     default:0
    // },
    // totalItem:{
    //     type:Number,
    //     require:true,
    //     default:0
    // },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},{
    timestamp:true
})

const userCartModel =  mongoose.model('userCarts', userCartSchema)

module.exports = userCartModel
