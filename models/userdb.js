var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema(
    {
    username: String,
    name: String,
    type: String,
    location: String,
    email: String,
    bio: String,
    wasteproduced: [String],
    wasteaccepted: [String],
    photo: String,
    charitysupported: [String],
    supportingwasterprovider: [String],
    datecreated: {type: Date, default: Date.now},
        isAdmin: {type: Boolean, default: false}
    }
);

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
var User = mongoose.model('user',userSchema);
module.exports = User;