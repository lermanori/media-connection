const express = require('express')
const router = express.Router()
const subscriptionController = require('../controllers/subscriptionController.js');
const authMiddleware = require('../middleware/auth-middleware.js')



router.post('/', authMiddleware, subscriptionController.create)
router.post('/notify', authMiddleware, subscriptionController.notify)



module.exports = router