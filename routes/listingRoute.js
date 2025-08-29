require('dotenv').config()
const express = require("express")
const router = express.Router()
let controller = require('../controller/listingController.js')

router.route('/')
.post(controller.addNewListing)
.get(controller.index)

router.route('/:id')
 .put(controller.updateListing)
 .get(controller.showListing)
 .delete(controller.deleteListing)

module.exports = router
