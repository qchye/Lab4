
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
                {userlist: newuserlist, currentuser:currentuser});
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
                {userlist: newuserlist, currentuser: currentuser});
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
                {user: userfound, profileId: currentuser._id});
        });
    };

module.exports.fetchProfileWaster =
    function(req, res){
        usermodel.findById(req.params.id, function(err, userfound){
            if (err) throw err;

            res.render("ProfileWaster.ejs",
                {user: userfound, profileId: currentuser._id});
        });
    };
module.exports.fetchCharityUser =
    function(req, res){
        usermodel.findById(req.params.id, function(err, userfound){
            if (err) throw err;


            res.render("charityuser.ejs",
                {user: userfound, profileId: currentuser._id});
        });
    };
module.exports.fetchWasterUser =
    function(req, res){
        usermodel.findById(req.params.id, function(err, userfound){
            if (err) throw err;
            res.render("wasteruser.ejs",
                {user: userfound, profileId: currentuser._id});
        });
    };
module.exports.fetchMessage =
    function(req, res) {
        messagemodel.findOne({from: currentuser.name}, function (err, messagebox) {
            if (err) {
                console.log(err);
            }
            else {
                return res.render("message.ejs",
                    {messagebox: messagebox, user: currentuser});
            }
        });
    };
module.exports.fetchMessageId =
    function(req, res){
        messagemodel.findOne({from: currentuser.name}, function(err, messagebox) {
            if(err) {
                console.log(err);
            }
            else{
                /*if friend is in send list, bring to front, if not, assign one to the front of sent list*/
                if(messagebox.to.includes(req.params.id)){
                    messagebox.to.unshift(messagebox.to.splice(messagebox.to.indexOf(req.params.id), 1)[0]);
                    messagebox.save(function (err){
                        if (err) return res.sendStatus(403);
                    });
                }
                else{
                    message.to.unshift(req.params.id);
                }
            }
            return res.render("message.ejs",
                {messagebox: messagebox, user:currentuser});
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
                /*if no message send but send is pressed, for safety purpose*/
                if(newmessage== ""){
                    if(messagebox.to.length === 0){
                        return res.redirect("/message");
                    }
                    else{
                        var sendername = messagebox.to[0];
                        return res.redirect("/message/"+sendername);
                    }
                }
                /*create sent message for both user and friend*/
                else{
                    messagebox.msg.push({content: newmessage, belonger:messagebox.from});
                    messagebox.save(function (err){
                        if (err) return res.sendStatus(403);
                    });
                    /*trying to send message to self*/
                    if(messagebox.to.length === 0){
                        messagebox.to.push(messagebox.from);
                    }
                    else{
                        messagemodel.findOne({from: messagebox.to[0]}, function(err, friend) {
                            if(err) {
                                console.log(err);
                            }
                            else{
                                if(!(friend.from === messagebox.from)){
                                    friend.msg.push({content: newmessage, belonger:messagebox.from});
                                    friend.save(function (err){
                                        if (err) return res.sendStatus(403);
                                    });
                                }
                            }
                            return res.render("message.ejs",
                                {messagebox: messagebox, user: currentuser, friend: friend});
                        });

                    }
                }
            }
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
            "address": req.body.address,
            "phone":req.body.phone,
            "password":req.body.password,
            "type": req.body.type
        });
        var newMessagebox = messagemodel({
            from: newUser.name,
            to: [],
            msg: [],
        });
        currentuser = newUser;
        newMessagebox.save(function(err){
            if(err) return res.sendStatus(403);
        });
        newUser.save(function (err){
            if (err) return res.sendStatus(403);
            if(newUser.type == "waster"){
                return res.redirect("/cafehome");
            }
            else{
                return res.redirect("/charityhome");
            }
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
            if(user.type == "waster"){
                return res.redirect("/cafehome");
            }
            else{
                return res.redirect("/charityhome");
            }
        });
    };