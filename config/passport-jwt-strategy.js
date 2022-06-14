const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/users');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'hakunamatata'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    
    User.findById(jwtPayLoad._id, function(err, user){
        if(err){
            console.log('Error in finding User from JWT', err);
            return;
        }

        if(user){
            //return the user if found
            return done(null, user);
        }
        else{
            //if the user is not found
            return done(null, false);
        }
    });
}));

module.exports = passport;