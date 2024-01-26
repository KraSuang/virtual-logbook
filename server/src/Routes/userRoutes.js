const express = require('express');
const authenticateToken = require('../middleware/authentication.js');
const getUserData = require('../api/user/UserData.js');

const router = express.Router();

router.get('/', authenticateToken, getUserData);

module.exports = router;
