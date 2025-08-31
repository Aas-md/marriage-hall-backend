const Listing = require('./models/listingModel.js')
const Review = require('./models/reviewModel.js');
const { listingSchema, reviewSchema } = require("./schema.js");
// const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {

    if (req.isAuthenticated()) {

        next()
    } else {

        return res.status(401).json({ error: "Not logged in" })
    }

}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body)

    if (error) {
        res.send('Error in validate review : ' + error)
    } else {
        next()
    }
}

module.exports.isReviewAthor = async (req, res, next) => {
    const { id, reviewId } = req.params
    let review = await Review.findById(reviewId)
    if (!review) {
        let err = new Error("Review not found")
        err.statusCode = 404
        throw err
    }
    if (!review.author._id.equals(res.locals?.currUser?._id)) {

        res.send("error : you are not the owner of this review")
        return res.redirect(`/listings/${id}`)
    }
    next()

}