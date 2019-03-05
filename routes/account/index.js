const account = require('express').Router();
const get = require('./get');
const create = require('./create');
const users = require('./users');
const update = require('./update');

account.get('/', get);
account.get('/users', users);
account.post("/", create);
account.put("/", update);

module.exports = account;