const express = require('express')
const { addItemToCart, removeItemFromCart, updateItemQuantity, userCart} = require('../controllers/cart')

const router = express.Router()

router.get('/user-cart', userCart)
router.post('/add-item-to-cart', addItemToCart)
router.post('/remove-item-from-cart', removeItemFromCart)
router.post('/update-quantity-in cart', updateItemQuantity)


module.exports = router