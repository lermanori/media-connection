const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware.js')
const groupController = require('../controllers/groupController')


router.post('/create', authMiddleware, groupController.create);
router.delete('/:groupid/delete', authMiddleware, groupController.delete);
router.delete('/:groupid/:friendshipid/user/delete', authMiddleware, groupController.deleteUserFromGroup);
router.delete('/:groupid/:postid/post/delete', authMiddleware, groupController.deleteUserFromGroup);
router.get('/', authMiddleware, groupController.getGroups);
router.get('/:groupid', authMiddleware, groupController.getGroup);
router.get('/:groupid/posts', authMiddleware, groupController.getGroupPosts);
router.put('/permissions', authMiddleware, groupController.updatePermissions);
router.get('/permissions/:groupId', authMiddleware, groupController.getDefaultPermissions);
router.post('/permissions/:groupId', authMiddleware, groupController.setDefaultPermissions);


module.exports = router