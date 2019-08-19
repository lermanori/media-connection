const express = require('express')
const router = express.Router()
const friendController = require('../controllers/friendController.js');
const authMiddleware = require('../middleware/auth-middleware.js')


router.post('/add', authMiddleware, friendController.addFriend);
router.post('/approve', authMiddleware, friendController.approveFriend);
router.get('/', authMiddleware, friendController.getFriends);
router.post('/users', authMiddleware, friendController.getUsers);


module.exports = router