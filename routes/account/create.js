module.exports = (req, res) => {
    const {
        Account
    } = require("../../models/account");

    res.setHeader('Access-Control-Allow-Origin', '*');
    var account = Account,
        newAccount = new account({
            userName: req.body.userName.toLowerCase(),
            password: req.body.password,
            email: req.body.email,
            friends: []
        });

    //make sure all required fields are present
    if (!newAccount.userName || !newAccount.password || !newAccount.email) {
        res.status("500").json("UserName, Password and Email are required!");
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
};