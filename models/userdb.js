var mongoose = require('mongoose');
var userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        phone: String,
        name: String,
        type: String,
        address: {type: String, default: ""},
        email: String,
        bio: String,
        wasteproduced: [String],
        wasteaccepted: [String],
        photo: {type: String, default: "/assets/coffee.jpg"},
        charitysupported: [String],
        supportingwasteprovider: [String],
        datecreated: {type: Date, default: Date.now},
        isAdmin: {type: Boolean, default: false}
    }
);

var user = mongoose.model('user',userSchema);

/* Sign up information can get:
Username
Company Name
email address
address
password
type
 */
/*
Profile edit can get:
Bio
Waste provide/waste produce
photo
 */
module.exports = user;