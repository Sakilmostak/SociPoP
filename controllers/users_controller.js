module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "profile"
    });
}

module.exports.edit = function(req,res){
    res.end('<h1>You can edit your profile here</h1>');
}