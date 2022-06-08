const passport= require('passport');
//fetching the strategy
const LocalStrategy= require('passport-local').Strategy;

//acquring the db schema
const User= require('../models/users');

//authentication using passport
passport.use(new LocalStrategy(
        {
            usernameField: 'email'
        },
        function(email,password,done){
            //find a user and establish the identity
            User.findOne({email: email}, function(err,user){
                if(err){
                    console.log('Error in finding user --> Passport');
                    //report an error to passport
                    return done(err);
                }

                if(!user || user.password!=password){
                    console.log('Invalid Username/Password');
                    //if the authenticated user is not the correct one
                    return done(null, false);
                }

                //if the user is authenticated successfully
                return done(null,user);
            });
        }
    )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})


// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null,user);
    });
});

//making it public
module.exports  = passport;