const Post= require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/users');
const Like = require('../models/like');

//adding action when directed to this controller
module.exports.create= async function(req, res){
    try{
        //fetching the post from the form and saving it in db
        let post = await Post.create(
            {
            content: req.body.content,
            user: req.user._id
            },
        )

        let user = await User.findById(post.user);

        // checks if its an ajax request
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: post,
                    username: user.name,
                    flashmsg: "Post made!"
                },
                message: "Post created!"
            })
        }

        // to flash this message onto the browser
        req.flash('success', 'Post made!');

        return res.redirect('back');
    }
    catch(err){
        // to flash this message onto the browser
        req.flash('error', err);
        return res.redirect('back');
    }
    
}


module.exports.destroy = async function(req,res){
    try{
        //params are provided as a query with the link
        //eg. posts/delete/:id, here id is the param
        let post = await Post.findById(req.params.id);

        // .id means converting object _id into string
        // which is good for comparison
        if(post.user == req.user.id){

            // CHANGE :: delete the associated likes for the post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel: 'Post'});
            await Like.deleteMany({_id: {$in: post.comments}});

            
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id,
                        flashmsg: "Post and associated comments deleted!"
                    },
                    message: "Post deleted"
                })
            }

            // to flash this message onto the browser
            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }
        else{
            req.flash('error', 'You are not authorized delete this post');
            return res.redirect('back');
        }
    }
    catch(err){
        // to flash this message onto the browser
        req.flash('error', err);
        return res.redirect('back');
    }
    
}