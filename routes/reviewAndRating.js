const express = require('express')
const { deleteReviewAndRating, edit, add } = require('../controllers/reviewAndRating')

const router = express.Router()

router.post('/add-review-and-rating', add)
router.put('/edit-review-and-rating/:reviewAndRatingId', edit)
router.delete('/delete-review-and-rating/:reviewAndRatingId', deleteReviewAndRating)

module.exports = router