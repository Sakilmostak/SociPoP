const Post= require('../models/post');
const Comment = require('../models/comment');

//adding action when directed to this controller
module.exports.create= function(req, res){
    //fetching the post from the form and saving it in db
    Post.create(
        {
        content: req.body.content,
        user: req.user._id
        },
        function(err, post){
            if(err){
                console.log('error in creating the post');
                return res.redirect('back');
            }

            return res.redirect('back');
        }
    );
}


module.exports.destroy = function(req,res){
    //params are provided as a query with the link
    //eg. posts/delete/:id, here id is the param
    Post.findById(req.params.id, function(err,post){
        // .id means converting object _id into string
        // which is good for comparison
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                if(err){
                    console.log(err);
                }
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}