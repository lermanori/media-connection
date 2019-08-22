const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController.js');
const authMiddleware = require('../middleware/auth-middleware.js')


router.get('/:id', authMiddleware, profileController.get)
router.post('/', authMiddleware, profileController.create)
router.put('/', authMiddleware, profileController.update)


module.exports = router