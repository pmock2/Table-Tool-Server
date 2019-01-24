module.exports = (req, res) => {
    const {
        Account
    } = require("../../models/account"), {
        Campaign
    } = require("../../models/campaign");

    var myCookie = req.headers.cookie;
    var regex = /=(.*)/;
    var match = regex.exec(myCookie);
    if (match !== null) {
        var token = match[1];
        Account.findByToken(token).then((user) => {
            var campaignObject = {
                name: req.body.name,
                owner: user.id,
                users: [user.userName],
                DM: user._id,
                players: []
            };
            new Campaign(campaignObject).save();
            console.log('created group');
            res.status(200).send('Campaign Created!');
        }).catch((err) => {
            res.status(401).send(`${err}`);
        });
    } else {
        res.status(401).send('No cookie :(');
    }
};