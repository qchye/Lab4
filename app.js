const express = require('express');
const app = express();
const route = require("./routes/router.js");
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('Express serving at port ${PORT}');
});

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use('/',route);
app.use('/charityhome',route);
app.use('/cafehome',route);
app.use('/profilewaster',route);
app.use('/profilecharity',route);
app.use('/charityuser',route);
app.use('/wasteruser',route);
app.use('/message',route);
app.use('/contactus',route);