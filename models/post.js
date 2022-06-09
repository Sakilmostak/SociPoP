const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        user: {
            //refers to the user db id and its type
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        // include the array of ids of all comments in this posh schemna itself
        comments: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Comment'
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;