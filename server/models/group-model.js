const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require("../models/user-model")

const GroupSchema = new Schema({
    group_name: String,
    group_desc: String,
    admin: String,
    members: [{
        memberUid: String,
        role: String
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    defaultPermissions: [String]
})

const Group = mongoose.model('group', GroupSchema)

module.exports = Group;