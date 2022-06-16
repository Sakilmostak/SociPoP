// adding database present in users
const User = require("../models/users");
const fs = require('fs');
const path = require('path');
const Friend = require('../models/friend');

//adding action when directed to profile controller
// profile is present in views
module.exports.profile = async function(req,res){
    try{

        //to check if the given users are friends
        let isFriend=false;
        let user = await User.findById(req.query.profile_id);

        let friend = await Friend.findOne(
            {
                from_user: req.query.user_id,
                to_user: req.query.profile_id
            }
        );

        if(friend){
            isFriend=true;
        }


        return res.render('user_profile',{
            title: "profile",
            profile_user: user,
            isFriend: isFriend
        });
    }
    catch(err){
        console.log('Error',err);
    }
    
    
}

module.exports.update = async function(req, res){
    try{
        if(req.user.id == req.params.id){
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******Multer Error',err);
                }

                user.name = req.body.name;
                user.email = req.body.email

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }

                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        else{
            req.flash('error','Unauthorized');
            return res.status(401).send('Unauthorized');
        }
    }
    catch(err){
        console.log('Error',err);
    }
    
}

//adding action when directed to edit controller
module.exports.edit = function(req,res){
    res.end('<h1>You can edit your profile here</h1>');
}

//adding action when directed to signUp controller
module.exports.signUp= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "SociPoP | Sign Up"
    })
}

//adding action when directed to singIn controller
module.exports.signIn= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile'); 
    }

    return res.render('user_sign_in',{
        title: "SociPoP | Sign In"
    })
}

//get the signup data
module.exports.create= async function(req,res){
    try{
        if(req.body.password!= req.body.confirm_password){
            // return to the same page
            return res.redirect('back');
        }
    
        let user = await User.findOne({email: req.body.email});
    
        if(!user){
            await User.create(req.body);
    
            return res.redirect('/users/sign-in');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error',err);
    }
    
}

//adding action when user sign-in 
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

//adding action when sign-out is called
module.exports.destroySession = function(req,res){
    //signing out from the session using passport js
    req.logout(function(err){
        if(err){
            console.log(err);
        }

        req.flash('success', 'You have logged out!');

        return res.redirect('/');

    });
}