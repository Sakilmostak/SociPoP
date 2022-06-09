const Post= require('../models/post');

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