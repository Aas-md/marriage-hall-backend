const express = require('express')
const mongoose = require('mongoose')
const dotenv  = require("dotenv")
dotenv.config()
const listings = require('./routes/listingRoute.js')
const Listing = require('./models/listingModel.js')
const mongo_url = process.env.DB_URL

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



main().then(() => {
    console.log("connected to db")
}).catch((e) => {
    console.log(e)
})

async function main() {
    await mongoose.connect(mongo_url)
}



app.get('/', (req, res) => {
    res.send('Hello from Express and MongoDB!')
})




app.use('/listings',listings)


app.listen(3000, () => {
    console.log("Server is listing on port 3000")
})




// Catch-all 404 handler
app.all("{*any}", (req, res, next) => {
   res.send("page not found")
})








// app.post('/listings',async (req, res)=>{
//     console.log(req.body?.listing)
//     const listing = req.body?.listing
//     const newListing = new Listing(listing)
   
//     await newListing.save()
//     .then(()=> res.send('listing added successfully'))
//     .catch((err)=> res.send('Error in adding new listing' + err))
// })
