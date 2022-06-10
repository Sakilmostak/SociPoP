const Comment= require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    //finding the post to which the comment belongs to 
    Post.findById(req.body.post, function(err,post){
        if(err){
            console.log('Error in finding the post for comment',err);
        }
        // if the post id is found
        if(post){
            //saving the comment in the db
            Comment.create(
                {
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                },
                function(err, comment){
                    if(err){
                        console.log('Error in creating the comment',err);
                    }

                    // adding the comment to the array of comment in post for easy access
                    post.comments.push(comment);
                    post.save();

                    return res.redirect('/');
                }
            );
        }
    })
}