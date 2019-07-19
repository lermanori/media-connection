const jwt = require('jsonwebtoken')
const {
    JWT_KEY
} = require('../config/keys.js')

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, JWT_KEY);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({
            "message": "authorization failed"
        })
    }
}