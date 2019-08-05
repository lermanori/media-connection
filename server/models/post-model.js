const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require("../models/user-model")

const PostSchema = new Schema({
    properties:[],
    group:{type:Schema.Types.ObjectId,ref:'Group'}

})

const Post = mongoose.model('post', PostSchema)

module.exports = Post;