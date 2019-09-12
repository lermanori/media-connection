const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscriptionSchema = new Schema({
    subscriberId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subscriptionData: {}
})
const Subscription = mongoose.model('subscription', SubscriptionSchema)

module.exports = Subscription