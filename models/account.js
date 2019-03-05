var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var accountSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    friends : Array,
    pendingFriends: Array,
}, {
    collection: "account"
});

accountSchema.methods.toJSON = function () {
    var account = this;
    var userObject = account.toObject();
    return userObject;
};

accountSchema.methods.generateAuthToken = function () {
    var account = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: account._id.toHexString(),
        access
    }, 'pmocksalt').toString();
    account.tokens = account.tokens.concat([{
        access,
        token
    }]);
    return account.save().then(() => {
        return token;
    });
};


accountSchema.methods.addToken = function (access, token) {
    var account = this;
    account.tokens = account.tokens.concat([{
        access,
        token
    }]);
    return account.save();
};

accountSchema.methods.removeToken = function (token) {
    var account = this;
    var tokens = account.tokens;
    var index = tokens.indexOf(token);
    tokens.splice(index, 1);
    return account.save();
};

accountSchema.methods.findTokenByAccess = function (access) {
    var account = this;
    var tokens = account.tokens;
    var token;

    tokens.forEach(function (element) {
        if (element.access === access) {
            token = element;
        }
    });
    return token;
};

accountSchema.methods.updateSchemaString = function (key, value) {
    var account = this;
    account[key] = value;
    return account.save();
};

accountSchema.statics.findById = function (id) {
    var account = this;
    return account.findOne({
        id
    }).then((foundAccount) => {
        if (!foundAccount) {
            return Promise.reject();
        } else {
            return foundAccount;
        }
    });
};

accountSchema.statics.findByToken = function (token) {
    var account = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'pmocksalt');

    } catch (e) {
        return Promise.reject();
    }

    return account.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

accountSchema.statics.findByCredentials = function (userName, password) {
    var account = this;
    return account.findOne({
        userName
    }).then((foundAccount) => {
        if (!foundAccount) {
            console.log('no user so reject');
            return Promise.reject("User does not exist");
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, foundAccount.password, (err, result) => {
                if (result) {
                    resolve(foundAccount);
                } else {
                    console.log('reject');
                    reject('Check password and try again');
                }
            });

        });
    });
};


accountSchema.statics.findUsers = function () {
    var account = this;
    return account.find().then((accounts) => {
        console.log(accounts);
        return accounts;
    });
};

accountSchema.pre('save', function (next) {
    var account = this;

    if (account.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {

            }
            bcrypt.hash(account.password, salt, (err, hash) => {
                account.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var Account = mongoose.model("Account", accountSchema);

module.exports = {
    Account
};