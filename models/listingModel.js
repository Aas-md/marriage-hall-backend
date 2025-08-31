const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const listingSchema = Schema({
    title: {
        type: String,
        require: true
    },
    desc: String,

    price: Number,
    address: String,
    city: String,

    reviews: [
        {
            "type": mongoose.Schema.Types.ObjectId,
            "ref": "Review"
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        url: {
            type : String,
             default: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fm=jpg&q=60&w=1200"
            },
        filename: {
            type : String,
            default:'random image'
        },
        
    }

})




const Listing = new mongoose.model("Listing", listingSchema)
module.exports = Listing
