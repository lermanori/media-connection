const User = require('../models/user-model')


module.exports = {
    async addFriend(req, res, next) {
        try {
            const user = req.user.user;
            const data = req.body;
            const email = data.email;

            const addedUser = await User.findOne({
                email
            });
            if (!addedUser.pendingReq.find(x => x == user._id))
                addedUser.pendingReq = [...addedUser.pendingReq, user._id];
            else {
                throw new Error("already contains user id in pending");
            }

            await addedUser.save();
            const me = await User.findOne({
                _id: user._id
            });

            if (!me.pendingSent.find(x => x == addedUser._id))
                me.pendingSent = [...me.pendingSent, addedUser._id];
            else {
                throw new Error("already sent request to user id");
            }

            await me.save();

            res.status(200).json({
                message: "youve added user" + addedUser._id
            });
        } catch (err) {
            res.status(400).json({
                message: "failed to add user"
            });
            console.log(err);
        }


    },

    async getFriends(req, res, next) {

        try {
            const userId = req.user.user._id;
            const user = await User.findById(userId);


            res.status(200).json({
                user
            });
        } catch (err) {
            res.status(400).json({
                message: "failed to get user"
            });
            console.log(err);
        }
    },

    async getUsers(req, res, next) {
        try {
            const users = req.body.users;
            const result = await User.find({
                '_id': {
                    $in: users
                }
            });
            res.status(200).json({
                result
            });
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "failed to get users"
            });
        }
    },
    async approveFriend(req, res) {
        try {
            const myId = req.user.user._id;
            const approveFriendId = req.body.approvedUserId;
            const approvedFriend = await User.findById(approveFriendId);
            const myUser = await User.findById(myId);
            if (!approvedFriend.pendingSent.find(x => x == myId)) {
                throw new Error("the friend doesnt contain your id in pending sent")
            }
            if (!myUser.pendingReq.find(x => x == approveFriendId)) {
                throw new Error("you dont contain your id in pending req")
            }
            const filterMyPendingReq = myUser.pendingReq.filter(x => x != approveFriendId);
            const filterFriendSentReq = approvedFriend.pendingSent.filter(x => x != myId);
            myUser.pendingReq = filterMyPendingReq;
            approvedFriend.pendingSent = filterFriendSentReq;
            const myfriends = myUser.friendsList;
            myUser.friendsList = [...myfriends, approveFriendId];
            const approvedFriendFriends = approvedFriend.friendsList;
            approvedFriend.friendsList = [...approvedFriendFriends, myId];
            await myUser.save();
            await approvedFriend.save();
            res.status(200).json({
                message: "friend approved"
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "approve of user failed"
            })
        }
    }
}