const express = require('express');

// extracting the router
const router= express.Router();
// adding the controller for users
const usersController = require('../controllers/users_controller');

// directing and executing the controller
router.get('/profile',usersController.profile);
router.get('/edit',usersController.edit);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

// making it public
module.exports = router;