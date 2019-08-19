const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: String,
    uid: String,
    groups: [String],
    pendingReq: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    pendingSent: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    friendsList: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

})
const User = mongoose.model('user', UserSchema)

module.exports = User