const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true
    },
    orderItems:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'orderItems',
            require:true
    }],
    orderDate:{
        type:Date,
        require:true,
        default:Date.now()
    },
    deliveryDate:{
        type:Date,
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'addresses',
        require:true
    },
    paymentDetails:{
        paymentMethods:{
            type:String,
            require:true
        },
        transactionId:{
            type:String,
        },
        paymentId:{
            type:String,
        },
        paymentStatus:{
            type:String,
            enum:["PENDING", "COMPLETED"],
            default:"PENDING",
        }
    },
    totalPrice:{
        type:Number,
        require:true
    },
    totalItem:{
        type:Number,
        require:true
    },
    orderStatus:{
        type:String,
        enum:["PENDING","PACKED", "SHIPPED", "DELIVERED"],
        default:"PENDING",
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const ordersModel =  mongoose.model('orders', ordersSchema)

module.exports = ordersModel
