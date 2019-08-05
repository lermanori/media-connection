const Post = require('../models/post-model')
const Group = require('../models/group-model')
const User = require('../models/user-model')



module.exports = {
    create(req, res, next) {
        const {
            filterdProperties,
            groupID
        } = req.body;
        const data = {
            properties: filterdProperties,
            group: groupID
        };
        console.log(data);
        new Post(data).save().then((doc) => {
            console.log(doc);
            Group.findByIdAndUpdate({
                _id: doc.group
            }, {
                $push: {
                    posts: doc._id
                }
            }).then((group) => {
                console.log("group"+group)
                res.status(201).json(doc);
            })
        }).catch((err) => {
            console.log(err.message);
            res.status(400).json(doc);
        })
    },
    getPosts(req, res, next) {
        User.findById(req.user.user._id).then((doc) => {
            const groups = doc.groups;
            Group.find({
                '_id': {
                    $in: groups
                }
            }).then((doc) => {
                res.status(200).json(doc);
            }).catch((err) => {
                console.log(err);
            })
        })
    },
    getPost(req, res, next) {
        let groupID = req.params.groupid;
        User.findById(req.user.user._id).then((doc) => {
            const groups = doc.groups;
            if (groups.includes(groupID)) {
                Group.findById({
                    '_id': groupID
                }).then((doc) => {
                    let filterduid = doc.members.map(arg => arg.memberUid);
                    let contains = filterduid.includes(req.user.user.uid);
                    if (contains) {
                        res.status(200).json(doc);
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(404).json("error getting group");
        })

    }
}