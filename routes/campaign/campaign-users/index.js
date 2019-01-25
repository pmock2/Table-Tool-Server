const campagin = require('express').Router();
const add_user = require('./add-user');
const get_users = require('./get-users');

//adds a user to a campaign via the user ID and campaign ID
campagin.post('/users', add_user);
campagin.get('/users', get_users);