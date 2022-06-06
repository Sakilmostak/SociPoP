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