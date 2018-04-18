const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

router.get('/',controllers.fetchLanding);
router.get('/home', controllers.fetchHome);
router.get('/profilewaster', controllers.fetchProfileWaster);
router.get('/profilecharity', controllers.fetchProfileCharity);
router.get('/message', controllers.fetchMessage);
router.get('/contactus', controllers.fetchContact);

module.exports = router;