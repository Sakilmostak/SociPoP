const express = require('express');

//extracting the router moudule
const router = express.Router();

router.use('/v1', require('./v1'));


module.exports = router;