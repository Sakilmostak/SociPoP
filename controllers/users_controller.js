// adding database present in users
const User = require("../models/users");

//adding action when directed to profile controller
// profile is present in views
module.exports.profile = async function(req,res){
    try{
        let user = await User.findById(req.params.id);

        return res.render('user_profile',{
            title: "profile",
            profile_user: user
        });
    }
    catch(err){
        console.log('Error',err);
    }
    
    
}

module.exports.update = async function(req, res){
    try{
        if(req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.params.id, req.body);
    
            return res.redirect('back');
        }
        else{
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
    return res.redirect('/');
}

//adding action when sign-out is called
module.exports.destroySession = async function(req,res){
    try{
        //signing out from the session using passport js
        await req.logout();

        return res.redirect('/');
    }
    catch(err){
        console.log('Error',err);
    }
    
}