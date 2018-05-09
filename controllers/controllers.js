
const mongoose = require('mongoose');
mongoose.connect("mongodb://caffeineaddict:ineedcaffeine2018@ds117010.mlab.com:17010/caffeineaddict", function(err, db){
    if(err){
        console.log('Some problem with the connection' + err);
    }else{
        console.log('The Mongoose connection is ready');
    }
});
var usermodel = require("../models/userdb.js");
var messagemodel = require("../models/messagedb.js");
var currentuser;
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
        usermodel.findById(req.params.id, function(err, userfound){
            if (err) throw err;
            res.render("ProfileCharity.ejs",
                {user: userfound});
        });
    };

module.exports.fetchProfileWaster =
    function(req, res){
        usermodel.findById(req.params.id, function(err, userfound){
            if (err) throw err;


            res.render("ProfileWaster.ejs",
                {user: userfound});
        });
    };
module.exports.fetchCharityUser =
    function(req, res){
        usermodel.findById(req.params.id, function(err, userfound){
            if (err) throw err;


            res.render("charityuser.ejs",
                {user: userfound});
        });
    };
module.exports.fetchWasterUser =
    function(req, res){
        usermodel.findById(req.params.id, function(err, userfound){
            if (err) throw err;


            res.render("wasteruser.ejs",
                {user: userfound});
        });
    };
module.exports.fetchMessage =
    function(req, res){
        messagemodel.findOne({from: currentuser.name}, function(err, messagebox) {
            if(err) {
                console.log(err);
            }
            else{
                /*Dont have message yet*/
                if(!messagebox){

                }
            }
            res.render("message.ejs",
                {messagebox: messagebox});
        });
    };
module.exports.updateMessage =
    function(req, res){
        const newmessage = req.body.message;
        messagemodel.findOne({from: currentuser.name}, function(err, messagebox) {
            if(err) {
                console.log(err);
            }
            else{
                messagebox.msg.push({content: newmessage, belonger:messagebox.from});
                messagebox.save(function (err){
                    if (err) return res.sendStatus(403);
                });
            }
            res.render("message.ejs",
                {messagebox: messagebox});
        });
    };
//user profile

module.exports.fetchUserProfile =
    function(req, res){

        res.render("userprofile.ejs",
            {user: usermodel.findOne({username: "Chye"})});

    };


module.exports.addUser =
    function (req, res){
        var newUser = usermodel({
            "email":req.body.email,
            "name":req.body.name,
            "username":req.body.username,
            "phone":req.body.phone,
            "password":req.body.password
        });
        newUser.save(function (err){
            if (err) return res.sendStatus(403);
            return res.status(200).send('Welcome to Food 4 Thought ' + req.body.username);
        });
    };

module.exports.authenticateUser =
    function (req, res) {

        var username = req.body.username;
        var password = req.body.password;

        usermodel.findOne({username: username, password: password}, function(err, user) {
            if(err) {
                console.log(err);
                return res.status(500).send();
            }

            if (!user) {
                return res.status(404).send('Incorrent username and/or password');
            }
            currentuser = user;
            return res.status(200).send('Welcome back, ' + username);
        });
    };