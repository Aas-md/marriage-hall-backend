const controller = require('../controller/userController.js')
const express = require("express")
const router = express.Router()
const passport = require('passport')

router.route('/signup')
    .post(controller.signup)

router.route('/login')
    .post(passport.authenticate('local', { failureMessage: true }),
        controller.login
    )

router.get('/logout', controller.logout)

module.exports = router