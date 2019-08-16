const Post = require('../models/post-model')
const Group = require('../models/group-model')
const User = require('../models/user-model')
const fs = require('fs').promises;



module.exports = {
    create(req, res, next) {
        const {
            filterdProperties,
            groupID,
            status
        } = req.body;
        const data = {
            properties: filterdProperties,
            group: groupID,
            status
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
                console.log("group" + group)
                res.status(201).json(doc);
            })
        }).catch((err) => {
            console.log(err.message);
            res.status(400).json(doc);
        })
    },
    addCommit(req, res, next) {
        const data = req.body;
        const {
            postId,
            done,
            image64,
            commitMessage
        } = data;
        const user = req.user.user;
        const time = JSON.stringify(Date.now());

        // to declare some path to store your converted image
        const path = './images/' + time + '.png'



        // to convert base64 format into random filename
        const base64Data = image64.replace(/^data:([A-Za-z-+/]+);base64,/, '');

        fs.writeFile(path, base64Data, {
            encoding: 'base64'
        }).then(
            () => {
                const path2 = '/images/' + time + '.png'
                const dataWithUser = {
                    path2,
                    commitMessage,
                    user,
                    time,
                    done,
                    postId
                }
                Post.findOneAndUpdate({
                    _id: postId
                }, {
                    $push: {
                        commits: dataWithUser
                    },
                    $set: {
                        status: done ? "waiting for approval" : "in process"
                    }
                }, {
                    new: true
                }).then((post) => {
                    res.status(201).json(post);
                }).catch(err => {
                    console.log(err);
                })
            }
        );
    },
    getCommits(req, res, next) {
        let postID = req.params.postid;
        Post.findById(postID).then((doc) => {
            const group = doc.group;
            const usergroups = req.user.user.groups;
            const found = usergroups.includes(`${group}`);
            if (found) {
                res.status(200).json(doc.commits);
            } else {
                throw new Error("notFound in user groups");
            }

        }).catch((err) => {
            console.log(err);
            res.status(400).json("error getting group");
        })
    },
    getPosts(req, res, next) {
        User.findById(req.user.user._id).then((doc) => {
            const groups = doc.groups;
            Post.find({
                'group': {
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
        let postID = req.params.postid;
        Post.findById(postID).then((doc) => {
            const group = doc.group;
            const usergroups = req.user.user.groups;
            const found = usergroups.includes(`${group}`);
            if (found) {
                res.status(200).json(doc);
            } else {
                throw new Error("notFound in user groups");
            }

        }).catch((err) => {
            console.log(err);
            res.status(400).json("error getting group");
        })

    }
}