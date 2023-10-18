const express = require('express')
const { addAddress, editAddress, deleteAddress, fetchAddress } = require('../controllers/address')

const router = express.Router()

router.post('/add', addAddress)
router.put('/edit', editAddress)
router.delete('/delete', deleteAddress)
router.get('/fetch', fetchAddress)

module.exports = router