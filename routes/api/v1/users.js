const express = require('express');
const userApi = require('../../../controllers/api/v1/users_api');

//extracting the router moudule
const router = express.Router();

router.post('/create-session', userApi.createSession);

module.exports = router;