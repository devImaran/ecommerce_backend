const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
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
    rating:{
        type:Number,
        require:true
    },
    review:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const productReviewAndRatingModel =  mongoose.model('reviewsAndRatings', reviewSchema)

module.exports = productReviewAndRatingModel
