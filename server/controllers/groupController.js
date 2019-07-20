const Group = require('../models/group-model')
const User = require('../models/user-model')



module.exports = {
    create(req, res, next) {
        const body = req.body;
        body['admin'] = req.user.user.uid;
        body['members'] = [];
        body.members.push({
            "memberUid": req.user.user.uid,
            "role": "admin"
        });
        new Group(
            body
        ).save().then((group) => {
            User.findOneAndUpdate({
                _id: req.user.user._id
            }, {
                $push: {
                    groups: group._id
                }
            }).then(() => {
                res.status(200).json({
                    "message": "group created"
                });
            })
        }).catch((err) => {
            res.status(400).json({
                "message": "group creation failed"
            });
        })
    },
    getGroups(req, res, next) {
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
    getGroup(req, res, next) {
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