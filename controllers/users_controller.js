// adding database present in users
const User = require("../models/users");

//adding action when directed to profile controller
// profile is present in views
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "profile"
    });
}

//adding action when directed to edit controller
module.exports.edit = function(req,res){
    res.end('<h1>You can edit your profile here</h1>');
}

//adding action when directed to signUp controller
module.exports.signUp= function(req,res){
    return res.render('user_sign_up',{
        title: "SociPoP | Sign Up"
    })
}

//adding action when directed to singIn controller
module.exports.signIn= function(req,res){
    return res.render('user_sign_in',{
        title: "SociPoP | Sign In"
    })
}

//get the signup data
module.exports.create= function(req,res){
    //handle if pass and confirm-pass doesnt match
    if(req.body.password!= req.body.confirm_password){
        // return to the same page
        return res.redirect('back');
    }

    //find the user if exists
    User.findOne(
        {email: req.body.email},
        function(err, user){
            //handling error
            if(err){
                console.log('error in finding user in signing up');
                return;
            }

            // if user's email does not exists
            if(!user){
                // creating a new profile using db
                User.create(req.body, function(err, user){
                    if(err){
                        console.log('error in creating user while signing up');
                        return;
                    }

                    return res.redirect('/users/sign-in');
                });
            }
            else{
                // if email exists
                return res.redirect('back');
            }
        }
    );
}

//adding action when user sign-in 
module.exports.createSession = function(req, res){
    
    //steps to authenticate
    //find the user in db
    User.findOne(
        {email: req.body.email},
        function(err,user){
            if(err){
                console.log('error in finding user in signing up');
                return;
            }

            //if user found
            if(user){
                // handle password which doesn't match
                if(user.password!= req.body.password){
                    return res.redirect('back');
                }

                //handle session creation
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            }
            else{
                //handle if user not found
                return res.redirect('back');
            }
        }
    )
}