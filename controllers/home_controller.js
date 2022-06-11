const Post = require('../models/post');
const User = require('../models/users');

// template
// module.exports.actionName= function(req, res){ do something };

//adding action when directed to this controller
// home is present in views
module.exports.home= async function(req, res){
    
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

    try{
        //finding all the post from db and populating the whole user to send to the views
        // populating means not just the id but the whole user data will be saved
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home',  {
            title: "SociPoP : Home",
            posts: posts,
            all_users: users
        });
    }
    catch(err){
        console.log('Error',err);
        return;
    }
    
    
}