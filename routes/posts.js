const express= require('express');

// extracting the router
const router= express.Router();
// adding the controller for posts
const postsController= require('../controllers/post_controller');

//executing the controller
router.get('/',postsController.posts);

//making it public
module.exports = router;