const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        maxLen :50,
        require:true
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories',
        require:true,
        default:null
    },
    level:{
        type:Number,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const categoryModel =  mongoose.model('categories', categorySchema)

module.exports = categoryModel
