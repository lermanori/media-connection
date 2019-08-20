const express = require('express')
const router = express.Router()
const friendController = require('../controllers/friendController.js');
const authMiddleware = require('../middleware/auth-middleware.js')


router.post('/add', authMiddleware, friendController.addFriend);
router.post('/approve', authMiddleware, friendController.approveFriend);
router.get('/', authMiddleware, friendController.getFriends);
router.post('/users', authMiddleware, friendController.getUsers);
router.post('/users/uid', authMiddleware, friendController.getUsersByUid);
router.post('/addToGroup', authMiddleware, friendController.addToGroup);


module.exports = router