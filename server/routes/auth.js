const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middleware/auth-middleware.js')


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', authMiddleware, (req, res) => {
    console.log("protected route")
    res.status(200).json({
        "message": "this is a protected route"
    });
})

// there is an auth middlewar// 

/*
router.delete('/delete', userController.deleteUser);
*/




module.exports = router