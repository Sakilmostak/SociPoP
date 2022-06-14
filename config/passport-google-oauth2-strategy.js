const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy(
    {
        clientID: "867921063545-10ll53ms9gatv5jmdjd9rvuvekv02nno.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:2500/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('error in google strategy-passport',err);
                return;
            }

            console.log(profile);

            if(user){
                //if found, set this user as req.user
                return done(null, user);
            }
            else{
                //if not found, create the user ans set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log('error in creating user in google strategy-passport',err);
                    }

                    return done(null, user);
                });
            }
        })
    }
));

module.exports = passport;