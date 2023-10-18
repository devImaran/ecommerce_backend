const { placeOrder, myOrders } = require("../controllers/orders");
const express = require('express')
const router = express.Router()

router.post('/place-order', placeOrder)
router.post('/my-orders', myOrders)


module.exports = router