const Post= require('../models/post');
const Comment = require('../models/comment');

//adding action when directed to this controller
module.exports.create= async function(req, res){
    try{
        //fetching the post from the form and saving it in db
        await Post.create(
            {
            content: req.body.content,
            user: req.user._id
            },
        );

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
            post.remove();

            await Comment.deleteMany({post: req.params.id});

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