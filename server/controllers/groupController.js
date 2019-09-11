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
    async delete(req, res) {
        try {
            const groupId = req.params.groupid;
            const group = await Group.findById(groupId);
            if (group.admin == req.user.user.uid) {

                await Group.findByIdAndDelete(groupId);
                console.log('deleted')
            } else {
                throw new Error("no permission to delete")
            }
            res.status(200).json(group);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async deleteUserFromGroup(req, res) {
        try {
            const groupId = req.params.groupid;
            const friendShipId = req.params.friendshipid;
            const group = await Group.findById(groupId);
            if (group.admin == req.user.user.uid) {
                group.members = group.members.filter(x => x._id != friendShipId)
                console.log(friendShipId)
                console.log(group.members)
                await group.save();
            } else {
                throw new Error("no permission to delete")
            }
            res.status(200).json(group);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async deletePostFromGroup(req, res) {
        try {
            const groupId = req.params.groupid;
            const postId = req.params.postid;
            const group = await Group.findById(groupId);
            if (group.admin == req.user.user.uid) {
                group.posts = group.members.filter(x => x._id != postId)
                console.log(postId)
                console.log(group.posts);
                await group.save();
            } else {
                throw new Error("no permission to delete")
            }
            res.status(200).json(group);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
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

    },
    getGroupPosts(req, res, next) {
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
                        res.status(200).json(doc.posts);
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(404).json("error getting group");
        })

    },
    async updatePermissions(req, res) {
        try {
            const body = req.body;
            let group = await Group.findById(body.group);
            let user = await User.findById(body.friend._id);
            const updatedPermissions = body.updatedPermissions;
            if (group.members.find(x => x.memberUid == user.uid)) {
                group.members.forEach((element, idx) => {
                    if (element.memberUid == user.uid) {
                        group.members[idx].role = updatedPermissions;
                    }
                });
            }
            console.log(group)
            group = await group.save();
            res.status(200).json({
                group,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "add to group failed"
            });
        }
    },
    async getDefaultPermissions(req, res) {
        try {
            let groupId = req.params.groupId;
            console.log(groupId)
            const group = await Group.findById(groupId);
            if (group.defaultPermissions == undefined) {
                res.status(201).json({
                    defaultPermissions: []
                });
            } else {
                res.status(200).json({
                    defaultPermissions: group.defaultPermissions
                });
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "get Permissions failed"
            });
        }
    },
    async setDefaultPermissions(req, res) {
        try {
            let groupId = req.params.groupId;
            let body = req.body;
            console.log(body)
            let group = await Group.findById(groupId);
            group.defaultPermissions = body;
            group = await group.save();
            res.status(200).json({
                group
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "get Permissions failed"
            });
        }
    }
}