const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

router.get('/',controllers.fetchMainPage);
router.get('/bye',controllers.fetchBye);
router.get('/users/:id', controllers.fetchSpecificId);
router.get('/users',controllers.fetchAllName);

module.exports = router;