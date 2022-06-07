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
    // do some
}

//adding action when user sign-in 
module.exports.createSession = function(req, res){
    //do some
}