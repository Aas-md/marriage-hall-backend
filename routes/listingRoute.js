require('dotenv').config()
const express = require("express")
const router = express.Router()
let controller = require('../controller/listingController.js')
const multer  = require('multer')
const {storage} = require('../cloudConfig.js')
const upload = multer({ storage})


router.route('/')
.post( upload.single('image'),controller.addNewListing)
.get(controller.index)

router.route('/:id')
 .put(controller.updateListing)
 .get(controller.showListing)
 .delete(controller.deleteListing)

module.exports = router
