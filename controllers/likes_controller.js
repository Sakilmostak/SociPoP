const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){
    try{

        // route eg. /likes/toggle/?id=adcde&type=Post
        let likeable;
        // to check if the like is added or removed
        let deleted=false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');  
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if a like already exists
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // if a like already exists then delete it
        if(existingLike){
            //removing the id from the array in post or comment
            likeable.likes.pull(existingLike._id);
            likeable.save();

            //removing the object from the like db
            existingLike.remove();
            deleted = true;
        }
        else{
            
            //creating a new like object
            let newLike = await Like.create({
                likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            });

            //pushing it into the array of post or comment
            likeable.likes.push(newLike._id);
            likable.save();
        }


        return res.status(200).json({
            message: "Request successful",
            data: {
                deleted: deleted
            }
        });


    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}