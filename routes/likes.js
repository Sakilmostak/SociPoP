const express = require('express');

//extracting the router moudule
const router = express.Router();

const likesController = require('../controllers/likes_controller');

router.post('/toggle', likesController.toggleLike);

module.exports= router;