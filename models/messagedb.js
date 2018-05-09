var mongoose = require('mongoose');
var messageSchema = mongoose.Schema(
    {
        from: String,
        to: String,
        msg: [{
            content: String,
            belonger: String
        }]
    }
);

var message = mongoose.model('message',messageSchema);
module.exports = message;