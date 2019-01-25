module.exports = (req, res) => {
    const {
        Account
    } = require("../../models/account");

    //need an easy way to authenticate the person that is making these kinds of requests
    var myCookie = req.headers.cookie;
    var regex = /=(.*)/;
    var match = regex.exec(myCookie);
    if (match !== null) {
        Account.findById(req.query.userId).then((user) => {
            res.status(200).send(user);
        }).catch((err) => {
            res.status(400).send(`${err}`);
        });
    } else {
        res.status(401).send('No cookie :(');
    }
};