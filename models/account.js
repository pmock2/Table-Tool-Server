var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var accountSchema = new Schema({
    userName: String,
    password: String,
    email: String
}, {
    collection: "account"
});
var account = mongoose.model("Account", accountSchema);

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
    return account.update({
        $pull: {
            tokens: {
                token
            }
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

accountSchema.statics.findByCredentials = function (username, password) {
    var account = this;
    return account.findOne({
        username
    }).then((foundAccount) => {
        if (!foundAccount) {
            console.log('no user so reject');
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, foundAccount.password, (err, result) => {
                if (result) {
                    resolve(foundAccount);
                } else {
                    console.log('reject');
                    reject('no match');
                }
            });

        });
    });
};

accountSchema.pre('save', function (next) {
    var account = this;
    if (account.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(account.password, salt, (err, hash) => {
                account.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

module.exports = {
    account: account
};