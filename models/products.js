const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type :String,
        required:true,
        max: 100
    },
    description:{
        type :String,
    },
    price:{
        type:Number,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    colors:{
        type:Array,
        required:true
    },
    images:{
        type:Array,
    },
    product_category_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "product_categories"
    },
    product_style_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "product_styles"
    },
    product_type_id:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "product_types"
    }
},{
    timestamp:true
})

const ProductsModel = mongoose.model('products', productSchema)

module.exports = ProductsModel;