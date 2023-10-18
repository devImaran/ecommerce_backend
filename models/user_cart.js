const mongoose = require('mongoose');

const userCartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users"
    },
    products:[{
        product_id:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: "products",
            quantity:Number
        }
    }]
})


const userCartModel = mongoose.model("user_cart",userCartSchema)

module.exports = userCartModel