const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers.js');
mongoose.connect("mongodb://caffeineaddict:ineedcaffeine2018@ds117010.mlab.com:17010/caffeineaddict", function(err){
    if(err){
        console.log('Some problem with the connection' + err);
    }else{
        console.log('The Mongoose connection is ready');
    }
});
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

router.get('/userprofile/:id', controllers.fetchUserProfile);



module.exports = router;