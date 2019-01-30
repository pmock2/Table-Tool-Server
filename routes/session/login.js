module.exports = (req, res) => {
    const {
        Account
    } = require("../../models/account");

    res.header('Access-Control-Allow-Methods', 'POST');
    console.log(req.body);
    var userName = req.body.userName.toLowerCase(),
        password = req.body.password;

    Account.findByCredentials(userName, password).then((user) => {
        console.log(`logging in ${userName}`);
        return user.generateAuthToken().then((token) => {
            res.cookie('auth', token);
            res.status(200).send('Logged in');
            // res.status(200).send('Login Successful');
        });
    }).catch((err) => {
        console.log(err);
        // res.status(400).send(err);
        res.status(400).json(err);
    });

};