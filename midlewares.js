const Listing = require('./models/listingModel.js')
const Review = require('./models/reviewModel.js')
const { listingSchema, reviewSchema } = require("./schema.js")
const jwt = require('jsonwebtoken');
const ExpressError = require("./utils/expressError.js")
const User = require('./models/userModel.js')

module.exports.validateListing = (req, res, next) => {

    let { error } = listingSchema.validate(req.body)

    if (error) {

        throw new ExpressError(400, error)
    } else {
        next()
    }
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id)
    if (listing == null || !listing.owner) {
        return res.status(401).json({ error: "user or listing not found" })
    }
    if (!listing?.owner?._id.equals(res.locals.currUser._id)) {

        return res.status(401).json({ error: "Not the owner in" })
    }
    next();

}

module.exports.isLoggedIn = async (req, res, next) => {

    if (req.isAuthenticated()) {
        console.log("LogedIn")
        return next()
    }

    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        try {
            const payload = jwt.verify(token, 'secretCode')


            const user = await User.findById(payload.id);
            if (!user) {
                return res.status(401).json({ error: 'User not found' })
            }

            req.user = user

            return next()
        } catch (err) {
            return res.status(401).json({ error: 'Invalid token' })
        }
    }

    // 3. Nahi mila to unauthorised
    return res.status(401).json({ error: 'Not logged in' })

}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body)

    if (error) {
        return res.status(422).json({ error: 'Error in validate review : ' + error })
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

    const currUser =
        res.locals?.currUser || req.user;

    // if (!review.author._id.equals(res.locals?.currUser?._id)) {

    //     res.status(401).json({ error: "you are not the owner of this review" })
    //     // return res.redirect(`/listings/${id}`)
    // }

    if (!currUser) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    // ownership check
    if (!review.author._id.equals(currUser._id)) {
        return res
            .status(403)
            .json({ message: "You are not the owner of this review" })
    }

    next()

}