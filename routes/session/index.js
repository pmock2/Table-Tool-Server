const session = require('express').Router();
const login = require('./login');
const logout = require('./logout');

session.post("/", login);
session.delete('/', logout);

module.exports = session;