const productsModel = require("../models/product")
const productReviewAndRatingModel = require("../models/reviewsAndRatings")
const userModel = require("../models/user")
const response = require("../services/response")

const add = async (req, res, next)=>{
    try{
        const { _id: userId } = req.user
        const { productId } = req.body
        const hasAlreadyReviewed = await productReviewAndRatingModel.findOne({userId, productId})
        if(hasAlreadyReviewed) return next({status: 400, message:'you have already reviewed this product'})

        const newReview = new productReviewAndRatingModel({
            userId,
            ...req.body
        })

        await newReview.save()

        await productsModel.findByIdAndUpdate(productId, {
            $push :{
                reviewsAndRatings : newReview._id
            }
        })

        await userModel.findByIdAndUpdate(userId, {
            $push :{
                reviewsAndRatings : newReview._id
            }
        })

        return res.send(response(200, 'Review added successfully'))

    }catch(err){
        console.log(err)
        next(err)
    }
}

const edit = async (req, res, next)=>{
    try{
        const { reviewAndRatingId  } = req.params
        const hasReview = await productRatingModel.findById(reviewAndRatingId)
        if(!hasReview) return next({status: 400, message:'review not found'})

        await productRatingModel.findByIdAndUpdate(reviewAndRatingId, req.body)

        return res.send(response(200, 'Review added successfully'))

    }catch(err){
        console.log(err)
        next(err)
    }
}


const deleteReviewAndRating = async (req, res, next)=>{
    try{
        const { _id: userId } = req.user
        const { reviewAndRatingId } = req.params
        const hasReview = await productRatingModel.findById(reviewAndRatingId)

        if(!hasReview) return next({status: 400, message:'review not found'})

        await productRatingModel.findByIdAndDelete(reviewAndRatingId)

        await productsModel.find(productId, {
            $pull : {
                reviewsAndRatings : newReview._id
            }
        })

        await userModel.findByIdAndUpdate(userId, {
            $pull : {
                reviewsAndRatings : newReview._id
            }
        })

        return res.send(response(200, 'Review added successfully'))

    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = {
    add,
    edit,
    deleteReviewAndRating
}