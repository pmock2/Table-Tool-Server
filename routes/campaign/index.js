const campagin = require('express').Router();
const create = require('./create');
const get = require('./get');

campagin.get("/", get);
campagin.post('/', create);

module.exports = campagin;