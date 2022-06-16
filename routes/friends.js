const express = require('express');

//extracting the router moudule
const router = express.Router();

const friendsController = require('../controllers/friends_controller');

router.post('/create-friend', friendsController.creatFriend);
router.post('/remove-friend', friendsController.removeFriend);


module.exports = router;