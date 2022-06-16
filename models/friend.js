const mongoose = require('mongoose');

const FriendSchema = new mongoose.Schema(
    {
        from_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        to_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

const Friend = mongoose.model('Friend', FriendSchema);
module.exports = Friend;