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
                })
                .then(docs => {
                    if (docs.length) {
                        res.status(400).json("Account already associated to " + newAccount.email);
                    } else {
                        account.find({
                                userName: newAccount.userName
                            })
                            .then(docs => {
                                if (docs.length) {
                                    res.status(400).json("User name is taken");
                                } else {
                                    newAccount.save();
                                    res.status(201).json("Account Created");
                                }
                            })
                            .catch(err => console.error(err));
                    }

                })
                .catch(err => console.error(err));
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
            })
            .then(docs => {
                if (docs.length) {
                    console.log("User Exists");
                    res.status(200).json({
                        email: docs[0].email,
                        userName: docs[0].userName
                    });
                } else {
                    console.log("User does not exist");
                    res.status(400).json("The username and password combination did not match our records.")
                }

            })
            .catch(err => console.error(err));
    });

};