const mongoose = require('mongoose');
mongoose.connect("mongodb://caffeineaddict:ineedcaffeine2018@ds117010.mlab.com:17010/caffeineaddict", function(err, db){
    if(err){
        console.log('Some problem with the connection' + err);
    }else{
        console.log('The Mongoose connection is ready');
    }
});
var usermodel = require("../models/userdb.js");

module.exports.fetchLanding =
    function(req, res){
        res.render("landingpage.ejs",
            {});
    };

module.exports.fetchCafeHome =
    function(req, res){
        res.render("cafehome.ejs",
            {});
    };
module.exports.fetchCharityHome =
    function(req, res, next){
    /*
        var newUser = usermodel({
            "username": "Chye",
            "name": "Sevenseeds ",
            "type": "waster",
            "address": "Carlton",
            "email": "hahaha@hotmail.com",
            "bio": "We are doing great job hahaha just come and visit our cafe.",
            "wasteproduced": "nothing",
            "photo": "/assets/cafe2.jpg",
         });
        newUser.save(function (err){
            if (err) return res.sendStatus(403);
            return res.end();
        });*/
        usermodel.find({}, function(err, users) {
            if (err) {
                res.send(err);
            }else if (users.length) {
                return res.render("charityhome.ejs",
                    {userlist: users});
                next();
            }
            else{
                return res.render("charityhome.ejs",
                    {userlist: users});
                next();
            }
    });
    };

module.exports.fetchContact =
    function(req, res){
        res.render("contactus.ejs",
            {});
    };

module.exports.fetchProfileCharity =
    function(req, res){
        res.render("ProfileCharity.ejs",
            {});
    };

module.exports.fetchProfileWaster =
    function(req, res){
        res.render("ProfileWaster.ejs",
            {});
    };
module.exports.fetchCharityUser =
    function(req, res){
        res.render("charityuser.ejs",
            {});
    };
module.exports.fetchWasterUser =
    function(req, res){
        res.render("wasteruser.ejs",
            {});
    };
module.exports.fetchMessage =
    function(req, res){
        res.render("message.ejs",
            {});
    };

/* Adam use this part of codes to add user when press sign up, and change all the default info to req.params something,
* link to the homepage root*/
module.exports.addUser =
    function (req, res){
        var newUser = usermodel({
            "emailAddress":req.body.email,
            "companyName":req.body.companyName,
            "username":req.body.username,
            "phone":req.body.phone,
            "password":req.body.password
        });
        newUser.save(function (err){
            if (err) return res.sendStatus(403);
            return res.end();
        });
    };
