// template
// module.exports.actionName= function(req, res){ do something };

//adding action when directed to this controller
// home is present in views
module.exports.home= function(req, res){
    return res.render('home',  {
        title: "Home"
    });
}