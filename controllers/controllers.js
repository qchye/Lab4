const database = require("../models/db.js");
//const userlist = [database.user1 , database.user2];
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
    function(req, res){
        res.render("charityhome.ejs",
            {});
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

