const express= require('express');
const passport= require('passport');

// extracting the router
const router= express.Router();

const postController = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication, postController.create);

module.exports= router;