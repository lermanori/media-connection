const User = require('../models/user-model')
const jwt = require('jsonwebtoken')
const {
    JWT_KEY
} = require('../config/keys.js')

module.exports = {
    register(req, res, next) {
        let {
            email,
            uid
        } = req.body;

        User.findOne({
            "uid": uid
        }).then((user) => {
            if (user) {
                res.status(401).json({
                    message: "user already exists"
                })
            }
            new User({
                "email": email,
                "uid": uid
            }).save().then(() => {
                res.status(200).json({
                    "message": "sucsess"
                })
            })
        }).catch(err => {
            res.status(401).json({
                message: "registration failed"
            });
        })
    },
    login(req, res, next) {
        let {
            email,
            uid
        } = req.body;
        User.findOne({
            "uid": uid
        }).then((user) => {
            if (!user) {
                console.log("no user")
                res.status(401).json({
                    "message": "login faild"
                })
            }
            let token = jwt.sign({
                user
            }, JWT_KEY, {
                expiresIn: "1h"
            });
            res.status(200).json({
                "message": "login sucseed",
                "token": token,
            })
        }).catch((err) => {
            console.log(err)
            res.status(401).json({
                "message": "login faild"
            })
        })
    }
}