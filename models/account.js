var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var accountSchema = new Schema({
    userName: String,
    password: String,
    email: String
}, {
    collection: "account"
})
var account = mongoose.model("Account", accountSchema);






module.exports = {
    account: account
}