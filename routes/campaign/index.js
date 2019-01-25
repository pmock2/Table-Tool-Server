const campagin = require('express').Router();
const create = require('./create');
const get = require('./get');
const update = require('./update');
const get_users = require("./campaign-users/get-users");
const add_users = require("./campaign-users/add-user");

//returns a campaign object based on the provided campaign id
campagin.get("/", get);
//creates a campaign based on the information provided
campagin.put('/', create);
//updates an existing campaign object with the values provided (name, DM, or owner)
campagin.post('/', update);

//Get users associated with campaign by id
campagin.get("/:id/users", get_users);
//add user to campaign by id
campagin.post("/:id/users", add_users);


module.exports = campagin;