const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });


    return res.json(200, {
        message: "List of posts",
        posts: posts
    });
}


module.exports.destroy = async function(req,res){
    try{
        //params are provided as a query with the link
        //eg. posts/delete/:id, here id is the param
        let post = await Post.findById(req.params.id);
        
        //authorizing the user
        if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            return res.status(200).json({
                message: "Post and associated comments deleted successfully!"
            });

        }
        else{
            return res.status(401).json({
                message: "You cannot delete this post!"
            });
        }
    }
    catch(err){
        console.log('******',err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
    
}