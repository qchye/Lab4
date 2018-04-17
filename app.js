const express = require('express');
const app = express();
const route = require("./routes/router.js");
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('Express serving at port ${PORT}');
});

app.set('view engine', 'ejs');
app.use('/assets', express.static( 'assets'));
app.use('/',route);





