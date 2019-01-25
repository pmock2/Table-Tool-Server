module.exports = (req, res) => {
    const {
        Campaign
    } = require("../../models/campaign");

    var myCookie = req.headers.cookie;
    var regex = /=(.*)/;
    var match = regex.exec(myCookie);
    if (match !== null) {
        Campaign.getCampaignById(req.query.campaignId).then((campaign) => {
            res.status(200).send(campaign.users);
        }).catch((err) => {
            res.status(401).send(`${err}`);
        });
    } else {
        res.status(401).send('No cookie :(');
    }
};