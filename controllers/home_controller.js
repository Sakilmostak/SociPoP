const Post = require('../models/post');

// template
// module.exports.actionName= function(req, res){ do something };

//adding action when directed to this controller
// home is present in views
module.exports.home= function(req, res){
    
    //finding all the posts from db and sending it to the views
    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log('error in finding the posts')
    //     }
    //     return res.render('home',  {
    //         title: "SociPoP : Home",
    //         posts: posts
    //     });
    // });

    //finding all the post from db and populating the whole user to send to the views
    // populating means not just the id but the whole user data will be saved
    Post.find({}).populate('user').exec(function(err,posts){
        if(err){
            console.log('error in finding the posts')
        }
        return res.render('home',  {
            title: "SociPoP : Home",
            posts: posts
        });
    });
    
}