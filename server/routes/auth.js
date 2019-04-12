var express = require('express')
var router = express.Router()
const passport = require('passport');

router.post('/local-register',(req,res)=>{
    const user = req.body
    if(user.email =="ori" && user.password =="1234")
    {
        res.sendStatus(200);
        console.log('200')
    }
    else
    {
        res.sendStatus(403);
        console.log('403')
    }
})

router.get('/',(req,res)=>{
    res.send(req.user);
})

router.get('/login',(req, res)=>{
    res.send('login page')
})
router.get('/logout',(req,res)=>{
    req.logOut();
    console.log(req.user);
    res.redirect('/');
})
router.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res) =>{
    //res.send(req.user)
    res.redirect('/#/taskManager');
})

module.exports = router