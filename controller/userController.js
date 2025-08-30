const User = require('../models/userModel.js')
module.exports.signup = async (req, res) => {

    try {

        let { email, username, password } = req.body;
        const newUser = new User({
            username: username,
            email: email,
        })
        let registeredUser = await User.register(newUser, password)

        await req.login(registeredUser, (err) => {
            if (err)
                res.send("error in signup" + err)
        })

        //   res.send({ status: "success", msg: "Welcome to mariageHall",user : registeredUser })

    } catch (e) {

        res.send(e)
    }
}

module.exports.login = async (req, res) => {
    res.send('success, Welcome to Wanderlust')
}


module.exports.logout = (req, res, next) => {

    req.logout((err) => {
        if (err) {
            return res.json({ status: "error", msg: err })
        }
        res.json({ status: "success", msg: "You are logged out" })
    })
}