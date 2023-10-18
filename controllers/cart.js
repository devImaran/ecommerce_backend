const userCartModel = require("../models/cart")
const cartItemsModel = require("../models/cartItems");
const { removeItem, userCartService } = require("../services/cart");
const response = require("../services/response");

const userCart = async (req, res, next) => {
    try {
        const { _id: userId } = req.user
        const data = await userCartService(userId)
        return res.send(response(200, 'cart Items fetched', { cartItems: data }))
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const addItemToCart = async (req, res, next) => {
    try {
        const { _id: userId } = req.user
        // check if this item is already in user cart
        const isItemAvailable = await cartItemsModel.findOne({
            userId, productId : req.body.productId
        })

        if (isItemAvailable) return res.send(next({ status: 400, message: "Selected item is already in bag" }))

        const addNewItemsIncartItems = new cartItemsModel({
            ...req.body,
            userId,
        })
        await addNewItemsIncartItems.save()

        // check if user cart is created or not 
        const hasUserCart = await userCartModel.findOne({ userId })

        if (!hasUserCart){
            const addItemsIncartModel = new userCartModel({
                userId,
                cartItems : addNewItemsIncartItems
            })
            await addItemsIncartModel.save()
        }else{
            await userCartModel.findOneAndUpdate(
                { userId }, 
                { $push: { cartItems: addNewItemsIncartItems } },
            );
        }
        return res.send(response({ status: 200, message: "Item added in bag" }))
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const removeItemFromCart = async (req, res, next) => {
    try {
        const { productId } = req.body
        const { _id: userId } = req.user

        //check if the product in user cart or not 
        const isProductExists = await cartItemsModel.findOne({ productId, userId })
        if (!isProductExists) return next({ status: 400, message: 'Product Not in Cart' })

        const result = await removeItem(productId, userId)
        if (result) return res.send(response(200, 'Item removed from cart'))
        return next(new Error())

    } catch (err) {
        console.log(err)
        next(err)
    }
}

const updateItemQuantity = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body
        const { _id: userId } = req.user

        //check if the product in user cart or not 
        const isProductExists = await cartItemsModel.findOne({ productId, userId })
        if (!isProductExists) return next({ status: 400, message: 'Product Not in Cart' })
        
        // if the quantity of the product is less tha equal to zero the remove the product from cart
        if (quantity <= 0){
            const res = await removeItem(productId, userId)
            if (!res) return next(new Error())
         }

        await cartItemsModel.findOneAndUpdate({ productId, userId }, { quantity })
        return res.send(response(200, 'product removed from cart'))

    } catch (err) {
        next(err)
    }
}


module.exports = {
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    userCart
}