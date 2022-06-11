const Comment= require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    try{
        //finding the post to which the comment belongs to 
        let post = await Post.findById(req.body.post);

        // if the post id is found
        if(post){
            //saving the comment in the db
            let comment = await Comment.create(
                {
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                }
            );

            // adding the comment to the array of comment in post for easy access
            post.comments.push(comment);
            post.save();

            return res.redirect('/');
        }
    }
    catch(err){
        console.log('Error',err);
    }
    
}


module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user == req.user.id){
            let postId = comment.post;

            comment.remove();

            await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        console.log('Error',err);
    }
    
}