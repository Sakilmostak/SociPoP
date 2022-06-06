const express = require('express');

//extracting the router moudule
const router = express.Router();
// adding the controller of home
const homeController = require('../controllers/home_controller');

// executing the controller
router.get('/', homeController.home);
//redirecting to users route
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile'));

// making it global
module.exports = router;