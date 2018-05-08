const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

router.get('/',controllers.fetchLanding);
router.get('/cafehome', controllers.fetchCafeHome);
router.get('/charityhome', controllers.fetchCharityHome);
router.get('/profilewaster', controllers.fetchProfileWaster);
router.get('/profilecharity', controllers.fetchProfileCharity);
router.get('/charityuser', controllers.fetchCharityUser);
router.get('/wasteruser', controllers.fetchWasterUser);
router.get('/message', controllers.fetchMessage);
router.get('/contactus', controllers.fetchContact);
router.post('/', controllers.addUser);

module.exports = router;