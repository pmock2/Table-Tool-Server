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
                name: req.body.userName,
                owner: user.userName,
                users: [user.userName],
                DM: user.userName,
                players: [],
                description : req.body.name || ''
            };
            new Campaign(campaignObject).save();
            console.log('created campaign');
            res.status(200).send('Campaign Created!');
        }).catch((err) => {
            res.status(401).send(`${err}`);
        });
    } else {
        res.status(401).send('No cookie :(');
    }
};