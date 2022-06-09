const Comment= require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err,post){
        if(err){
            console.log('Error in finding the post for comment',err);
        }
        if(post){
            Comment.create(
                {
                    comment: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                },
                function(err, comment){
                    if(err){
                        console.log('Error in creating the comment',err);
                    }

                    post.comments.push(comment);
                    post.save();

                    return res.redirect('/');
                }
            );
        }
    })
}