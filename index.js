var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var path = require('path');
const passportSetup = require('./server/config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./server/config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors')


var jsonParser = bodyParser.json()
const authRoutes = require('./server/routes/auth')
const groupRoutes = require('./server/routes/group')
const taskManagerRoutes = require('./server/routes/taskManager')
const postRoutes = require('./server/routes/post')

app.use(cors())
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongo.dbURI, {
    useNewUrlParser: true
}, () => {
    console.log('connected to mongoDB')
})

app.use(jsonParser);


var distPath = path.join(__dirname, 'mc3', 'dist', 'spa');



app.get('/', jsonParser, function (req, res) {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.use('/', express.static(distPath));
app.use('/auth', authRoutes);
app.use('/group', groupRoutes);
app.use('/api/projects', taskManagerRoutes);
app.use('/api/post', postRoutes);


var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));