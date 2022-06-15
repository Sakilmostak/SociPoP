const Comment= require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

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

            comment.populate('user', 'name email', function(err, comment){
                if(err){
                    console.log('error in populating comment',err);
                    return;
                }

                //sending confirmation mail to user who have posted
                //commentsMailer.newComment(comment);

                //adding job to the queue created with name 'emails' and executing the procss associated with it
                // the process for the job is available in workers/new_comment_worker
                let job = queue.create('emails', comment).save(function(err){
                    if(err){
                        console.log('error in creating a queue',err);
                        return;
                    }

                    console.log('job enqueued',job.id);
                })
            });
            

            return res.redirect('/');
        }
    }
    catch(err){
        console.log('Error',err);
    }
    
}

//authenticating the user and then deleting the comment
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