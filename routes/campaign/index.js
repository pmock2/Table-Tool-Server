const campagin = require('express').Router();
const create = require('./create');
const get = require('./get');
const update = require('./update');

//returns a campaign object based on the provided campaign id
campagin.get("/", get);
//creates a campaign based on the information provided
campagin.put('/', create);
//updates an existing campaign object with the values provided (name, DM, or owner)
campagin.post('/', update);

module.exports = campagin;