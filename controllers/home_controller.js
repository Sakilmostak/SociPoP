// template
// module.exports.actionName= function(req, res){ do something };


module.exports.home= function(req, res){
    return res.end('<h1> Express is up for SociPoP</h1>');
}