const express = require('express')
const { getMyDetails } = require('../controllers/user')

const router = express.Router()

router.get('/my-details', getMyDetails)

module.exports = router