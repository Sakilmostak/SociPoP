// template
// module.exports.actionName= function(req, res){ do something };


module.exports.home= function(req, res){
    return res.render('home',  {
        title: "Home"
    });
}