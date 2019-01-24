const account = require('express').Router();
const get = require('./get');
const create = require('./create');

account.get('/', get);
account.post("/", create);

module.exports = account;