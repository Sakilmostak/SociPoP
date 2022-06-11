const passport= require('passport');
//fetching the strategy
const LocalStrategy= require('passport-local').Strategy;

//acquring the db schema
const User= require('../models/users');

//authentication using passport
passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            // adds req to callback function for it to be used
            passReqToCallback: true
        },
        function(req,email,password,done){
            //find a user and establish the identity
            User.findOne({email: email}, function(err,user){
                if(err){
                    // flash error into the browser
                    req.flash('error',err);
                    //report an error to passport
                    return done(err);
                }

                if(!user || user.password!=password){
                    // flash error into the browser
                    req.flash('error','Invalid Username/Password');
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

//creating a function to check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

//creating a function to check if session is present
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user= req.user;
    }

    next();
}

//making it public
module.exports  = passport;