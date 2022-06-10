const express = require('express');
const passport = require('passport');

// extracting the router
const router= express.Router();
// adding the controller for users
const usersController = require('../controllers/users_controller');

// directing and executing the controller
router.get('/profile/:id', passport.checkAuthentication,usersController.profile);
router.get('/edit',usersController.edit);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.get('/sign-out',usersController.destroySession);

router.post('/create', usersController.create);
//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
        'local',
        {failureRedirect: '/users/sign-in'}
    ),
    usersController.createSession
);

// making it public
module.exports = router;