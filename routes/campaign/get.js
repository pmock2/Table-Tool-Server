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
            Campaign.getCampaignsByUserName(user.userName).then((campaigns) => {

                res.status(200).send(campaigns);
            }).catch((err) => {
                res.status(400).send(`${err}`);
            });
        }).catch((err) => {
            res.status(400).send(`${err}`);
        });
    } else {
        res.status(401).send('No cookie :(');
    }






};