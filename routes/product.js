const express = require('express')
const { addProduct, allProductsByCategory, singleProduct } = require('../controllers/product')
const authentication = require('../middleware/authentication')

const router = express.Router()

router.post('/add',authentication, addProduct)
router.get('/all-products', allProductsByCategory)
router.get('/single-product-details/:productId', singleProduct)

module.exports = router