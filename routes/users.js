const express = require('express');

// extracting the router
const router= express.Router();
// adding the controller for users
const usersController = require('../controllers/users_controller');

// executing the controller
router.get('/profile',usersController.profile);
router.get('/edit',usersController.edit);

// making it public
module.exports = router;