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
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;