var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var groupScheme = new Schema({
    name: String, //group name
    owner: String, //owner's ID
    users : Array,
}, {
    collection: "group"
});

groupScheme.methods.toJSON = function () {
    var group = this;
    var groupObj = group.toObject();
    return groupObj;
};

groupScheme.methods.addUser = function (userId) {
    var group = this;
    group.user = group.tokens.concat([userId]);
    return group.save();
};

var Group = mongoose.model("Group", groupScheme);


module.exports = {Group};