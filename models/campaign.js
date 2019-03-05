var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var campaignScheme = new Schema({
    name: String, //campaign name
    owner: String, //owner's ID
    characters: Array,
    DM: String,
    users: Array,
    description : String
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

campaignScheme.methods.updateSchemaString = function (key, value) {
    var campaign = this;
    campaign[key] = value;
    return campaign.save();
};

campaignScheme.statics.getCampaignsByOwnerId = function (userId) {
    var campaign = this;
    return campaign.find({
        owner: userId
    }).then((foundCampaigns) => {
        if (!foundCampaigns) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            resolve(foundCampaigns);
        });
    });
};


campaignScheme.statics.getCampaignsByUserName = function (username) {
    var campaign = this;
    return campaign.find({
        users: username
    }).then((foundCampaigns) => {
        if (!foundCampaigns) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            resolve(foundCampaigns);
        });
    });
};

campaignScheme.statics.getCampaignById = function (id) {
    var campaign = this;
    return campaign.find({
        _id: id
    }).then((foundCampaign) => {
        if (!foundCampaign) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            resolve(foundCampaign);
        });
    });
};

var Campaign = mongoose.model("Campaign", campaignScheme);


module.exports = {
    Campaign
};