const express = require('express');

//extracting the router moudule
const router = express.Router();
const passport = require('passport');
const postApi = require('../../../controllers/api/v1/posts_api');

router.get('/', postApi.index);
//setting route to delete a post by authenticating first
router.delete('/:id', passport.authenticate('jwt', {session: false}), postApi.destroy);

module.exports = router;