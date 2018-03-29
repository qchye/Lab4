const express = require('express');
const app = express();
const route = require("./routes/router.js");
const PORT = process.env.PORT || 3000;


app.listen(PORT, function(){
    console.log('Express serving at port ${PORT}');
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/',route);
app.use('/bye',route);
app.use('/users/:id',route);
app.use('/users',route);





