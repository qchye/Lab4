const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

router.get('/',controllers.fetchLanding);
router.get('/cafehome', controllers.fetchCafeHome);
router.get('/charityhome', controllers.fetchCharityHome);
router.get('/profilewaster/:id', controllers.fetchProfileWaster);
router.get('/profilecharity/:id', controllers.fetchProfileCharity);
router.get('/charityuser/:id', controllers.fetchCharityUser);
router.get('/wasteruser/:id', controllers.fetchWasterUser);
router.get('/message', controllers.fetchMessage);
router.get('/contactus', controllers.fetchContact);

router.get('/userprofile', controllers.fetchUserProfile);



module.exports = router;