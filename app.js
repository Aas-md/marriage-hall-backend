const express = require('express')
const mongoose = require('mongoose')
const dotenv  = require("dotenv")
dotenv.config()
const listings = require('./routes/listingRoute.js')
const Listing = require('./models/listingModel.js')
const reviews = require('./routes/reviewRoute.js')
const userRoute = require('./routes/userRoute.js')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/userModel.js')
const path = require("path")
const session = require('express-session')
const MongoStore = require('connect-mongo')
const dbUrl = process.env.DB_URL;



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
     mongoose.connect(mongo_url)
}


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600,
})

store.on("error",()=>{
    console.log("Error i mongo session store",err)
})


//sessions options

const sessionOptions = {
    store : store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge :  7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }

}

app.use(session(sessionOptions))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())





app.get('/', (req, res) => {
    res.send('Hello from Express and MongoDB!')
})




app.use('/listings',listings)
app.use('/listings/:id/reviews',reviews)
app.use('/',userRoute)


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
