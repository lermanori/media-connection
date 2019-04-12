var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var path = require('path');
const passportSetup = require('./server/config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./server/config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');


var jsonParser = bodyParser.json()
var fs = require('fs')
const authRoutes = require('./server/routes/auth')
const taskManagerRoutes = require('./server/routes/taskManager')

app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[keys.session.cookieKey],

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongo.dbURI,()=>{
    console.log('connected to mongoDB')
})

app.use(jsonParser);


var distPath = path.join(__dirname,'mc3','dist','spa');

app.get('/',jsonParser,function(req,res){
    res.sendFile(path.join(distPath,'index.html'));
});

app.use('/',express.static(distPath));
app.use('/auth',authRoutes);
app.use('/api/projects',taskManagerRoutes);

var port = process.env.PORT||3000;
app.listen(port,()=>console.log(`listening on port ${port}`));

