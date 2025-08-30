const express = require("express")
const router = express.Router({mergeParams : true})
const controller = require('../controller/reviewController.js')


router.post('/',controller.addReview)

router.delete('/:reviewId',controller.deleteReview)

module.exports = router