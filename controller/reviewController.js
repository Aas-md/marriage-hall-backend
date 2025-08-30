const Listing = require('../models/listingModel.js')
const Review = require('../models/reviewModel.js')


module.exports.addReview = async (req, res) => {

    try {
        let id = req.params.id
        let listing = await Listing.findById(id)
        let review = Review(req.body.review)
        listing.reviews.push(review)
        await review.save()
        await listing.save()

        res.send({ "success": "success", "msg": "Review Added Successfuly" })
    } catch (err) {

        res.send(err)
    }
}

module.exports.deleteReview = async (req, res) => {

    try {
        let { id, reviewId } = req.params

        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
        await Review.findByIdAndDelete(reviewId)
        res.send("success, Review Deleted Successfuly")
    } catch (err) {
        res.send(err)
    }


}