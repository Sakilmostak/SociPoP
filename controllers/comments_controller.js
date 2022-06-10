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


module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}