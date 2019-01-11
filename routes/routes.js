module.exports = function (app) {
    var mongooseModel = require("../models/account.js");

    /**
     * Register a new User
     */
    app.post('/account/register', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var account = mongooseModel.account,
            newAccount = new account({
                userName: req.body.userName.toLowerCase(),
                password: req.body.password,
                email: req.body.email
            });

        //make sure all required feilds are present
        if (!newAccount.userName || !newAccount.password || !newAccount.email) {
            res.status("500").json("UserName,Password and Email are REQUIRED!!!");
        } else {

            // Check is account already exists
            account.find({
                email: newAccount.email
            }, function (err, documents) {
                if (err) console.error(err);
                if (documents.length) {
                    console.log("Account Exists");
                    res.status(400).json("There is an account already associated with " + req.body.email);
                } else {
                    account.find({
                        userName: newAccount.userName
                    }, function (err, documents) {
                        if (err) console.error(err);
                        if (documents.length) {
                            res.status(400).json("User name is taken");
                        } else {
                            console.log("Creating New Account");
                            newAccount.save();
                            res.status(201).json("Account Created");
                        }
                    });
                }
            });
        }
    });

    /**
     * Login/Check Credentials
     */
    app.get('/login', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var account = mongooseModel.account,
            userName = req.query['userName'].toLowerCase(),
            password = req.query['password'];

        console.log("userName: " + userName);
        console.log("password:" + password);

        account.find({
            userName: userName,
            password: password
        }, function (err, documents) {
            if (err) console.error(err);
            if (documents.length > 0) {
                console.log("User Exists");

                res.status(200).json({
                    email: documents[0].email,
                    userName: documents[0].userName
                });

            } else {
                console.log("User does not exist");
                res.status(400).json("The username and password combination did not match our records.")
            }
        });
    });

};