const express = require('express')
const { categoryWiseProduct } = require('../controllers/category')
const router =express.Router()

router.get('/categories-wise-product', categoryWiseProduct)

module.exports = router