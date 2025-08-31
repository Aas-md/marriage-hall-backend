const Listing = require('../models/listingModel.js')

module.exports.index = async (req, res) => {
    const listings = await Listing.find()
    res.send(listings)
}

module.exports.addNewListing = async (req, res, next) => {

    let url = req.file?.path
    let filename = req.file?.filename
    const listing = req.body?.listing
    const newListing = new Listing(listing)
    newListing.owner = req.user._id
    newListing.image = { url, filename }
    await newListing.save()
    res.send('listing added successfully')

}

module.exports.showListing = async (req, res) => {

    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        }).populate('owner')

    if (listing)
        res.send(listing)
    else {
        throw new Error("Listing is not exist")
    }

}


module.exports.updateListing = async (req, res) => {
   
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing })
     if (typeof req.file !== 'undefined') {
        let url = req.file.path
        let filename = req.file.filename
        listing.image = { filename, url }
        await listing.save()
    }
    res.send('listing updated succssfully')
}

module.exports.deleteListing = async (req, res) => {
    
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

}
