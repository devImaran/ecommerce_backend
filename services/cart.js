const userCartModel = require("../models/cart")
const cartItemsModel = require("../models/cartItems")
const orderItemsModel = require("../models/orderItems")

const removeItem = async (productId, userId) => {
    try {
        const hasDeleted = await cartItemsModel.findOneAndDelete({ productId, userId })
        if (hasDeleted) {
            return true
        }
        return false
    } catch (err) {
        return false
    }
}

const userCartService = async(userId, isOrder= false)=>{

    let totalPrice = 0, totalItems = 0, cartItemsId = []
    let userCartItems = await userCartModel.findOne({ userId }).populate(
        {
            path: 'cartItems',
            populate:{
                path:'productId'
            }
        }
    );
    if (userCartItems && userCartItems.cartItems && userCartItems.cartItems.length > 0) {
        userCartItems.cartItems.forEach(async (item)=> {
            totalPrice += (item.quantity *  item.price)

            if(isOrder){
                const customerOrderItem = new orderItemsModel({
                    userId,
                    productId: item.productId,
                    quantity:item.quantity,
                    price:item.price,
                    size: item.size
                })
                cartItemsId.push(customerOrderItem._id)
                await customerOrderItem.save()
            }
        })
        totalItems= userCartItems.cartItems.length
        userCartItems = userCartItems.cartItems
    }

    const data = {
        userCartItems : userCartItems ? userCartItems : [] ,
        totalPrice,
        totalItems,
        cartItemsId
    }

    return data
}

module.exports = {
    removeItem,
    userCartService
}