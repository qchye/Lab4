const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

router.get('/',controllers.fetchMainPage);

module.exports = router;