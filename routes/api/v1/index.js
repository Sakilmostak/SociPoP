const express = require('express');

//extracting the router moudule
const router = express.Router();

router.use('/posts', require('./posts'));
router.use('/users', require('./users'));


module.exports = router;