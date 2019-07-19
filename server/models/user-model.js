const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: String,
    uid: String,
    groups: [String]
})
const User = mongoose.model('user', UserSchema)

module.exports = User