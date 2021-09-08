const express = require("express");

const SessionController = require('../app/controller/SessionController');

const routes = express.Router();

routes.get('/login', SessionController.loginForm);

module.exports = routes;