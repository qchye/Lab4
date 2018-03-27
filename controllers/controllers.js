const database = require("../models/db.js");
const userlist = [database.user1 , database.user2];

module.exports.fetchMainPage =
    function(req, res){
        res.render("homepage.html",
            {});
    };
module.exports.fetchBye =
    function(req, res){
        res.send("goodbye world");
    };
module.exports.fetchSpecificId =
    function(req, res){
        res.send(userlist[req.params.id].name);
    };
module.exports.fetchAllName =
    function(req, res){
        res.render("user_template.ejs",
            {alluser:userlist});
    };