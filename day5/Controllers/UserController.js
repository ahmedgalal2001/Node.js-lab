const userModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const userValidation = require("../Utils/UserValidation");
let getAllUsers = function (req, res) {
    userModel.find({}).then(user => {
        res.status(200).json(user);
    })
}
let createUser = function (req, res) {
    if (userValidation(req.body)) {
        const newUser = new userModel(req.body);
        bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
                console.error(err);
                return;
            }
            newUser.password = hash;
            newUser.save()
                .then(data => { console.log(data); res.status(200).json({ "msg": "add" }) })
                .catch(err => { console.log(err); res.status(400).json({ "msg": err.message }) });
        });
    } else res.status(400).json(userValidation.errors);
}

let loginUser = async function (req, res) {
    const { email, password } = req.body;
    if (email && password) {
        let user = await userModel.findOne({ "email": email })

        if (user) {
            let password = user.password;
            console.log(password);
            console.log(req.body.password);
            bcrypt.compare(req.body.password, password, function (err, result) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(result);
                if (result) {
                    res.status(200).json(user);
                } else {
                    res.status(400).json({ "msg": "password not correct" });
                }
            });

        }
        else res.status(400).json({ "msg": "email not correct" });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    loginUser
}