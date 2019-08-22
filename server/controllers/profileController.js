const User = require('../models/user-model')
const Profiles = require('../models/profile-model')


module.exports = {
    async get(req, res) {
        const profileId = req.params.id;
        const userId = req.user.user._id;
        let permission = "no";
        let payload = {};
        console.log("user:", userId);
        console.log("profile:", profileId);
        const user = await User.findById(userId);
        let profile = await Profiles.findOne({
            id: profileId
        });
        if (user == undefined) {
            res.status(400).json({
                message: "user undefined",
                permission
            })
        } else if (profile == undefined) {
            res.status(202).json({
                message: "profile undefined",
                permission
            })
        } else if (profileId == userId) {
            permission = "owner";
            profile = {
                id: profile.id,
                public: profile.public,
                friends: profile.friends,
                own: profile.own
            }
            console.log("prof-eq", profile)
        } else if (user.friendsList.find(x => x == profileId) != undefined) {
            permission = "friends"
            profile = {
                id: profile.id,
                public: profile.public,
                friends: profile.friends,
                own: null
            }

        } else {
            profile = {
                id: profile.id,
                public: profile.public,
                friends: profile.friends,
                own: null
            }
        }
        payload = {
            profile
        }
        if ((user != undefined) && (profile != undefined)) {
            res.status(200).json({
                ...payload,
                permission
            })
        }
    },
    async create(req, res) {
        const userId = req.user.user._id;
        let profile = await Profiles.find({
            id: userId
        });
        if (profile == undefined) {
            profile = await new Profiles({
                id: userId
            });
            profile = await profile.save();
            res.status(201).json({
                message: "profile created",
                profile
            });
        } else {
            res.status(401).json({
                message: "profile alreday defined"
            })
        }
    },
    async update(req, res) {
        const userId = req.user.user._id;
        const body = req.body;
        let profile = await Profiles.findOneAndUpdate({
            id: userId
        }, {
            $set: {
                own: body.own,
                friends: body.friends,
                public: body.public
            }
        }, {
            new: true
        });
        if (profile != undefined) {
            res.status(200).json({
                message: "profile updated",
                profile
            });
        } else {
            res.status(401).json({
                message: "profile not defined"
            })
        }
    }


}