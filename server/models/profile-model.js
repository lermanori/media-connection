const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    public: {},
    friends: {},
    own: {},

})
const User = mongoose.model('profile', ProfileSchema)

module.exports = User