const express = require('express')
const { add, edit, deleteProductType } = require('../controllers/category')
const router = express.Router()

router.post('/add', add)
router.post('/edit', edit)
router.post('/delete', deleteProductType)

module.exports = router