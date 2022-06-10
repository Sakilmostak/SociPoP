const mongoose = require('mongoose');

// creating schema for db using mongoose
const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        //comments belongs to a user
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        post: {
            // storing ids of post
            type: mongoose.Schema.Types.ObjectId,
            // referring to the collection from which the id would be taken
            ref: 'Post'
        }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports= Comment;