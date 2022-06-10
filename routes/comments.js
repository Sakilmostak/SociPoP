const express= require('express');
const passport= require('passport');

// extracting the router
const router= express.Router();

const commentsController = require('../controllers/comments_controller');

router.post('/create',passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports= router;