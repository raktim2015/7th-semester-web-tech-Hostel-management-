const UserModel = require('../models/users.model.js')

exports.insert = (req,res) => {
    console.log(req)
    UserModel.createUser(req.body)
    .then(() => {
        res.status(201).send()
    })
}

exports.fetchAllUsers = (req,res) => {
    console.log(req)
    res.status(201).send(req)
}
