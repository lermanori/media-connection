const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware.js')
const postController = require('../controllers/postController.js')


router.post('/create', authMiddleware, postController.create);
router.post('/commit', authMiddleware, postController.addCommit);
router.get('/:postid/commit', authMiddleware, postController.getCommits);
router.post('/:postid/approve', authMiddleware, postController.approveCommit);
router.post('/:postid/disapprove', authMiddleware, postController.disapproveCommit);
router.get('/', authMiddleware, postController.getPosts);
router.get('/:postid', authMiddleware, postController.getPost);


module.exports = router