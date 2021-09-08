const express = require("express");

const routes = express.Router();

const public = require('./public');
const admin = require('./private');
const users = require('./users');

routes.use('/', public);
routes.use('/admin', admin);
routes.use('/users', users);

module.exports = routes;
