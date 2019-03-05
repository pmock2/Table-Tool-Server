module.exports = (req, res) => {
    const {
        Campaign
    } = require("../../models/campaign");

    var myCookie = req.headers.cookie;
    var regex = /=(.*)/;
    var match = regex.exec(myCookie);
    if (match !== null) {
        Campaign.getCampaignById(req.body.campignId).then((campaign) => {
            var name = req.body.name; //campaign name
            var dm = req.body.dm; // dm name
            var owner = req.body.owner; // owner name
            var description = req.body.description;
            if (!(isEmpty(name))) {
                campaign.updateSchemaString('name', name);
            }
            if (!(isEmpty(dm))) {
                campaign.updateSchemaString('DM', dm);
            }
            if (!(isEmpty(owner))) {
                campaign.updateSchemaString('owner', owner);
            }
            if (!(isEmpty(description))) {
                campaign.updateSchemaString('description', description);
            }
            res.status(200).send(campaign);
        }).catch((err) => {
            res.status(401).send(`${err}`);
        });
    } else {
        res.status(401).send('No cookie :(');
    }
};

function isEmpty(val) {
    if (val === null || val === undefined || val === '') {
        return true;
    }
    else {
        return false;
    }
}