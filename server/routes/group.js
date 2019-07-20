const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware.js')
const groupController = require('../controllers/groupController')


router.post('/create', authMiddleware, groupController.create);
router.get('/', authMiddleware, groupController.getGroups);
router.get('/:groupid', authMiddleware, groupController.getGroup);


module.exports = router