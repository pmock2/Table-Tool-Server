module.exports = (req, res) => {
    const {
        Account
    } = require("../../models/account");

    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    var myCookie = req.headers.cookie;
    var regex = /=(.*)/;
    var match = regex.exec(myCookie);
    if (match !== null) {
        var token = match[1];
        Account.findByToken(token).then((user) => {
            user.removeToken(user.findTokenByAccess('auth')).then(() => {
                res.clearCookie('auth');
                res.status(200).send(user.tokens);
                // res.redirect('/home');
            });
        }).catch((err) => {
            console.log(`${err}`);
            res.status(400).send(`${err}`);
        });
    } else {
        res.status(401).send('not logged in');
    }

};