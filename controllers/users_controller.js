module.exports.profile = function(req,res){
    res.end('<h1>User Profile</h1>')
}

module.exports.edit = function(req,res){
    res.end('<h1>You can edit your profile here</h1>');
}