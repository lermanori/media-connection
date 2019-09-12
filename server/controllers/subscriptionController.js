const Subscription = require("../models/subscription-model")
const keys = require("../config/keys")
const webpush = require('web-push');



module.exports = {
    async create(req, res) {
        try {
            const body = req.body;
            const subscriberId = req.user.user._id;
            console.log(body);
            console.log(req.user.user);
            const subscription = await new Subscription({
                subscriberId,
                subscriptionData: body
            });
            const creation = await subscription.save();
            res.status(201).json(creation);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    async notify(req, res) {
        const body = req.body;
        const timeToNotify = body.timeToNotify;
        const subscriptionObject = body.subscription;
        const message = body.message;
        const now = Date.now();
        const timeFromNow = timeToNotify - now;
        console.log(timeFromNow);
        console.log(timeToNotify);
        console.log(now);
        console.log("set timer for" + timeFromNow);
        setTimeout(async () => {
            console.log("time arrived");
            const pushSubscription = subscriptionObject;
            const payload = message;

            const options = {
                vapidDetails: {
                    subject: 'mailto:lermanori@gmail.com',
                    publicKey: keys.vapid.publicKey,
                    privateKey: keys.vapid.privateKey
                },
            }
            const promise = webpush.sendNotification(
                pushSubscription,
                payload,
                options
            );
            console.log(promise);

        }, timeFromNow);


    }
}