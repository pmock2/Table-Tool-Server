module.exports = (req, res) => {
    const {
        Account
    } = require("../../models/account");

    res.status(200).send(Account.findUsers());
};