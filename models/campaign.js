var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var campaignScheme = new Schema({
    name: String, //campaign name
    owner: String, //owner's ID
    characters : Array,
    DM : String,
    users : Array
}, {
    collection: "campaign"
});

campaignScheme.methods.toJSON = function () {
    var campaign = this;
    var campaignObj = campaign.toObject();
    return campaignObj;
};

campaignScheme.methods.addUser = function (userId) {
    var campaign = this;
    campaign.user = campaign.tokens.concat([userId]);
    return campaign.save();
};

var Campaign = mongoose.model("Campaign", campaignScheme);


module.exports = {Campaign};