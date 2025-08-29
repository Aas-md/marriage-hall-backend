const Listing = require('../models/listingModel.js')


module.exports.index = async (req, res) => {
    try {
        const listings = await Listing.find()
        res.send(listings)
    } catch (err) {
        res.send("some thing went wrong " + err)
    }
}

module.exports.addNewListing = async (req, res, next) => {

    try {
        const listing = req.body.listing
        const newListing = new Listing(listing)

        await newListing.save()
        res.send('listing added successfully')

    } catch (err) {
        res.send('Error in adding new listing' + err)
    }

}


module.exports.showListing = async (req, res) => {

    try {
        const { id } = req.params;
        const listing = await Listing.findById(id)

        if (listing)
            res.send(listing)
        else {
            req.send("error", "The listing is exist")
        }
    } catch (err) {
        res.send("some thing went wrong " + err)
    }
}


module.exports.updateListing = async (req, res) => {

    try {
        const { id } = req.params;
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

        res.send('listing updated succssfully')
    } catch (err) {
        res.send('Error in listing eupdate' + err)
    }

}

module.exports.deleteListing = async (req, res) => {

    try {
        const { id } = req.params
        const deletedListing = await Listing.findByIdAndDelete(id)

        if (!deletedListing) {
            return res.status(404).send("Listing not foundd")
        }

        res.send({
            success: true,
            message: "Listing deleted successfully",
            data: deletedListing
        })

    } catch (err) {
        res.send('Error in listing update' + err)
    }

}
