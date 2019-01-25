module.exports = (req, res) => {
    const {
        Campaign
    } = require("../../../models/campaign");

    var myCookie = req.headers.cookie,
        campaignId = req.params.id,
        regex = /=(.*)/,
        match = regex.exec(myCookie);

    if (match !== null) {
        Campaign.getCampaignById(campaignId).then((campaign) => {
            campaign.addUser(req.body.userId);
            res.status(200).send('User added');
        }).catch((err) => {
            res.status(401).send(`${err}`);
        });
    } else {
        res.status(401).send('No cookie :(');
    }
};