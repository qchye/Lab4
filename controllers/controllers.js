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
    function(req, res, next){
        var newuserlist = [];
        const searchresult = req.query.search;
        usermodel.find({}, function(err, users) {
            if (err) {
                res.send(err);
            }else if (searchresult) {
                users.forEach(function(user){
                    if (searchresult === user.name && user.type === "charity") {
                        newuserlist.push(user);
                    }
                });
            }
            else{
                users.forEach(function(user){
                    if(user.type === "charity"){
                        newuserlist.push(user);
                    }
                });
            }
            return res.render("cafehome.ejs",
                {userlist: newuserlist});
            next();
        });
    };
module.exports.fetchCharityHome =
    function(req, res, next){
        var newuserlist = [];
        const searchresult = req.query.search;
        usermodel.find({}, function(err, users) {
            if (err) {
                res.send(err);
            }else if (searchresult) {
                users.forEach(function(user){
                    if (searchresult === user.name && user.type === "waster") {
                        newuserlist.push(user);
                    }
                });
            }
            else{
                users.forEach(function(user){
                    if(user.type === "waster"){
                        newuserlist.push(user);
                    }
                });
            }
            return res.render("charityhome.ejs",
                {userlist: newuserlist});
            next();
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

module.exports.addUser =
    function (req, res){
        var newUser = usermodel({
            "username": "Chye",
            "name": "The Caffeine Addict",
            "type": "waster",
            "address": "Carlton",
            "email": "hahaha@hotmail.com",
            "bio": "We are strong. We are kind. We are here to help homeless and poverty.",
            "wasteproduced": "nothing",
            "photo": "/assets/coffee.jpg",
        });
        newUser.save(function (err){
            if (err) return res.sendStatus(403);
            return res.end();
        });
    };
