
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
            messagemodel.findOne({from: currentuser.name}, function(err, message){
                if (err) throw err;
                else{
                    return res.render("cafehome.ejs",
                        {userlist: newuserlist, currentuser: currentuser, usermessage: message});
                }
            });
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
            messagemodel.findOne({from: currentuser.name}, function(err, message){
                if (err) throw err;
                else{
                    return res.render("charityhome.ejs",
                        {userlist: newuserlist, currentuser: currentuser, usermessage: message});
                }
            });
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
            return res.render("ProfileCharity.ejs",
                {user: userfound, profileId: currentuser.id});
        });
    };

module.exports.fetchProfileWaster =
    function(req, res){
        usermodel.findById(req.params.id, function(err, userfound){
            if (err) throw err;

            return res.render("ProfileWaster.ejs",
                {user: userfound, profileId: currentuser.id});
        });
    };
module.exports.fetchCharityUser =
    function(req, res){
        usermodel.findById(req.params.id, function(err, userfound){
            if (err) throw err;
            return res.render("charityuser.ejs",
                {user: userfound});
        });
    };
module.exports.fetchWasterUser =
    function(req, res){
        usermodel.findById(req.params.id, function(err, userfound){
            if (err) throw err;
            return res.render("wasteruser.ejs",
                {user: userfound});
        });
    };
module.exports.fetchMessage =
    function(req, res) {
        messagemodel.findOne({from: currentuser.name}, function (err, messagebox) {
            if (err) throw err;
            else {
                return res.render("message.ejs",
                    {messagebox: messagebox, user: currentuser});
            }
        });
    };
module.exports.fetchMessageId =
    function(req, res){
        messagemodel.findOne({from: currentuser.name}, function(err, messagebox) {
            if (err) throw err;
            else{
                /*if friend is in send list, bring to front, if not, assign one to the front of sent list*/
                if(messagebox.to.includes(req.params.id)){
                    messagebox.to.unshift(messagebox.to.splice(messagebox.to.indexOf(req.params.id), 1)[0]);
                    messagebox.save(function (err){
                        if (err) return res.sendStatus(403);
                    });
                }
                else{
                    messagebox.to.unshift(req.params.id);
                    messagebox.save(function (err){
                        if (err) return res.sendStatus(403);
                    });
                }
                messagemodel.findOne({from: req.params.id}, function(err, friendmessagebox) {
                    if (err) throw err;
                    else if(req.params.id !== messagebox.from){
                        /*if friend is in send list, bring to front, if not, assign one to the front of sent list*/
                        if (friendmessagebox.to.includes(currentuser.name)) {
                            friendmessagebox.to.unshift(friendmessagebox.to.splice(friendmessagebox.to.indexOf(currentuser.name), 1)[0]);
                            friendmessagebox.save(function (err) {
                                if (err) return res.sendStatus(403);
                            });
                        }
                        else {
                            friendmessagebox.to.unshift(currentuser.name);
                            friendmessagebox.save(function (err) {
                                if (err) return res.sendStatus(403);
                            });
                        }
                    }
                });
                usermodel.findOne({name: messagebox.to[0]}, function(err, myfriend) {
                    if (err) throw err;
                    else{
                        return res.render("message.ejs",
                            {messagebox: messagebox, user: currentuser, friend: myfriend});
                    }
                });
            }
        });
    };

module.exports.updateMessage =
    function(req, res){
        const newmessage = req.body.message;
        messagemodel.findOne({from: currentuser.name}, function(err, messagebox) {
            if (err) throw err;
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
                    /*trying to send message to self*/
                    if(messagebox.to.length === 0){
                        messagebox.to.push(messagebox.from);
                    }
                    messagemodel.findOne({from: messagebox.to[0]}, function(err, friend) {
                        if (err) throw err;
                        else{
                            messagebox.msg.push({content: newmessage, belonger:messagebox.from, sendto: friend.from});
                            messagebox.save(function (err){
                                if (err) return res.sendStatus(403);
                            });
                            /*send to self message only save once*/
                            if(!(friend.from === messagebox.from)){
                                friend.msg.push({content: newmessage, belonger:messagebox.from, sendto: friend.from});
                                friend.save(function (err){
                                    if (err) return res.sendStatus(403);
                                });
                            }
                            usermodel.findOne({name: friend.from}, function(err, myfriend) {
                                if (err) throw err;
                                else{
                                    return res.redirect("/message/"+myfriend.name);
                                }
                            });
                        }
                    });
                }
            }
        });
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