const express = require("express");

const SessionController = require('../app/controller/SessionController');

const sessionValidators = require('../app/validators/session');

const routes = express.Router();

routes.get('/login', SessionController.loginForm);
routes.post('/login', sessionValidators.login, SessionController.login);

module.exports = routes;