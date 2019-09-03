const User = require('../models/user-model')
const Profiles = require('../models/profile-model')
const formidable = require('formidable')
const path = require('path'),
    fs = require('fs')


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
                permission: profileId == userId ? 'owner' : permission,
            })
        } else if (profileId == userId) {
            permission = "owner";
            profile = {
                id: profile.id,
                public: profile.public,
                friends: profile.friends,
                profilePicture: profile.profilePicture,
                own: profile.own,
                email: user.email,
            }
            //console.log("prof-eq", profile)
        } else if (user.friendsList.find(x => x == profileId) != undefined) {
            const user2 = await User.findById(profileId);
            permission = "friends"
            profile = {
                id: profile.id,
                public: profile.public,
                friends: profile.friends,
                own: null,
                profilePicture: profile.profilePicture,
                email: user2.email
            }

        } else {
            profile = {
                id: profile.id,
                public: profile.public,
                friends: profile.friends,
                own: null,
                profilePicture: profile.profilePicture,
                email: null,

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
        let profile = await Profiles.findOne({
            id: userId
        });
        console.log(profile);
        if (profile == undefined) {
            profile = await new Profiles({
                id: userId,
                email: req.user.user.email

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
        console.log(req.user.user.email)
        const userId = req.user.user._id;
        const body = req.body;
        let profile = await Profiles.findOneAndUpdate({
            id: userId,

        }, {
            $set: {
                own: body.own,
                friends: body.friends,
                public: body.public,
                email: req.user.user.email
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
    },
    async updateProfilePic(req, res) {
        try {
            const userId = req.user.user._id;
            const path = './profiles/' + userId + '.png'
            const folder = './' + 'profiles'

            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder)
            }
            const form = new formidable.IncomingForm()
            form.uploadDir = folder
            form.parse(req, (_, fields, files) => {
                console.log('\n-----------')
                console.log('Fields', fields)
                console.log('Received:', Object.keys(files))
                // console.log('files:', Object.values(files))
                // console.log(Object.values(files)[0].path)
                // console.log(path)
                fs.rename(Object.values(files)[0].path, path, (err) => {
                    console.log(err)
                });
            })
            const shift = (str) => {
                const path = str.split("");
                path.shift();
                path.shift();
                const res = path.join("");
                return res;
            }
            const user = await User.findByIdAndUpdate(userId, {
                $set: {
                    profilePicture: shift(path)
                }
            }, {
                new: true
            });
            const profile = await Profiles.findOneAndUpdate({
                id: userId
            }, {
                $set: {
                    profilePicture: shift(path)
                }
            }, {
                new: true
            });
            res.status(200).json(profile);


        } catch (err) {
            console.log(err)
            res.status(400).json({
                message: "cant upload photo"
            });
        }
    },
    async search(req, res) {
        const results = await Profiles.find({
            $text: {
                $search: req.query.search
            }
        }, {
            score: {
                $meta: "textScore"
            }
        }).sort({
            score: {
                $meta: "textScore"
            }
        });
        // console.log(req.query);
        res.status(200).json(results);
    }
}