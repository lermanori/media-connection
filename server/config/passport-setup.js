const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model')

passport.serializeUser((user,done)=>{
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user);
    })
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accsessToken,refreshToken,profile,done) => {

        const providerId = profile.id
        User.findOne({googleId:providerId}).then((user)=>{
            if (user){
                console.log('current user: '+ user)
                done(null,user)
            }
            else{
                new User({
                    email: profile._json.email,
                    googleId: providerId
                }).save().then((newUser)=>{
                    console.log('new user created: '+ newUser);
                    done(null,newUser);
                })
            }
        })
    })
);