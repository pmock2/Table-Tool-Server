module.exports = function (app) {
    var {Account} = require("../models/account");
    /**
     * Register a new User
     */
    app.post('/account/register', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        var account = Account,
            newAccount = new account({
                userName: req.body.userName.toLowerCase(),
                password: req.body.password,
                email: req.body.email
            });

        //make sure all required fields are present
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
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        var userName = req.query.userName.toLowerCase(),
            password = req.query.password;

        Account.findByCredentials(userName, password).then((user) => {
            console.log(`logging in ${userName}`);
            return user.generateAuthToken().then((token) => {
                res.cookie('auth', token);
                res.status(200).send('Logged in');
                // res.status(200).send('Login Successful');
            });
        }).catch((err) => {
            console.log(`User not found ${err}`);
            res.status(400).send(`User not found ${err}`);
        });
    });

    app.get('/user', (req, res) => {
        var myCookie = req.headers.cookie;
        var regex = /=(.*)/;
        var match = regex.exec(myCookie);
        if (match !== null) {
            var token = match[1];
            Account.findByToken(token).then((user) => {
                if (!user) {
                    res.status(401).send('User not found!');
                } else {
                    res.status(200).send(user);
                }
            });
        }
    });
};