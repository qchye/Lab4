const express = require('express');
const app = express();
const router = require("./routes/router.js");
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('Express serving at port ${PORT}');
});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/',router);
app.use('/register', router);
app.use('/login', router);
app.use('/charityhome',router);
app.use('/cafehome',router);
app.use('/profilewaster/:id',router);
app.use('/profilecharity/:id',router);
app.use('/charityuser/:id',router);
app.use('/wasteruser/:id',router);
app.use('/message',router);
app.use('/contactus',router);
app.use('/userprofile', router);
app.use('/message/:id', router);
