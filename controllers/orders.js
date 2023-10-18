const ordersModel = require("../models/orders")
const { userCartService } = require("../services/cart")
const moment = require('moment')
const response = require("../services/response")
const cartItemsModel = require("../models/cartItems")
const userCartModel = require("../models/cart")

const placeOrder = async (req, res, next)=>{
    try{
        const { _id: userId } = req.user
        const { paymentMethod, addressId } = req.body

        const userCart  = await userCartService(userId, true)
        if (userCart.userCartItems.length === 0) return next({status: 400, message : 'user cart is empty'})

        const deliveryDate = moment(new Date(), "DD-MM-YYYY").add(7, 'days')

        if (paymentMethod === "COD"){
            const orders = new ordersModel({
                userId,
                orderItems: userCart.cartItemsId,
                totalPrice: userCart.totalPrice,
                totalItems: userCart.totalItems,
                shippingAddress: addressId,
                deliveryDate,
                paymentDetails:{
                    paymentMethods:"COD",
                    transactionId:null,
                    paymentId:null
                },
            })

            await orders.save()
        }

        await cartItemsModel.findOneAndDelete({userId})
        await userCartModel.findOneAndDelete({userId})

        return res.send(response(200, 'order placed successfully'))

    }catch(err){
        console.log(err)
        next(err)
    }
}


const myOrders = async (req, res, next)=>{
    try{
        const { _id: userId } = req.user
        const userOrders = await ordersModel.find({userId}).populate({
            path : 'orderItems',
            populate: 'productId'
        }).populate('shippingAddress')
        return res.send(response(200, 'order placed successfully', {userOrders}))

    }catch(err){
        console.log(err)
        next(err)
    }
}

module.exports = {
    placeOrder,
    myOrders
}