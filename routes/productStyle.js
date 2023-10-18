const express = require('express')
const { add, edit, deleteProductStyle } = require('../controllers/productStyle')
const router = express.Router()

router.post('/add', add)
router.post('/edit', edit)
router.post('/delete', deleteProductStyle)

module.exports = router