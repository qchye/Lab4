const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');

router.get('/',controllers.fetchLanding);
router.post('/register', controllers.addUser);
router.post('/login', controllers.authenticateUser);
router.get('/cafehome', controllers.fetchCafeHome);
router.get('/charityhome', controllers.fetchCharityHome);
router.get('/profilewaster/:id', controllers.fetchProfileWaster);
router.get('/profilecharity/:id', controllers.fetchProfileCharity);
router.get('/charityuser/:id', controllers.fetchCharityUser);
router.get('/wasteruser/:id', controllers.fetchWasterUser);
router.get('/editprofile', controllers.fetchEditProfile);
router.post('/edit', controllers.saveEdits);
router.get('/support/:id', controllers.Support);
router.get('/message', controllers.fetchMessage);
router.get('/message/:id', controllers.fetchMessageId);
router.post('/message', controllers.updateMessage);
router.get('/contactus', controllers.fetchContact);


module.exports = router;