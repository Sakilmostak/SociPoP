const Friend = require('../models/friend');
const User = require('../models/users');

module.exports.creatFriend = async function(req,res){
    try{
        let friendship = await Friend.create({
            from_user: req.query.from_id,
            to_user: req.query.to_id
        });

        let user = await User.findById(req.query.from_id).populate('friends');
        user.friends.push(req.query.to_id);
        user.save();

        return res.redirect('back');
    }
    catch(err){
        console.log(err);
    }
}

module.exports.removeFriend = async function(req,res){
    try{
        let friendship = await Friend.findOne({
            from_user: req.query.from_id,
            to_user: req.query.to_id
        });

        friendship.remove();

        let user = await User.findById(req.query.from_id).populate('friends');
        user.friends.pull(req.query.to_id);
        user.save();

        return res.redirect('back');
    }
    catch(err){
        console.log(err);
    }
}