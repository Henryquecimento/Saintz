const express = require("express");

const SessionController = require('../app/controller/SessionController');
const UsersController = require('../app/controller/UsersController');

const sessionValidators = require('../app/validators/session');

const routes = express.Router();

routes.get('/login', SessionController.loginForm);
routes.post('/login', sessionValidators.login, SessionController.login);

routes.post('/logout', SessionController.logout);
routes.get('/forgot-password', SessionController.forgotForm);
routes.post('/forgot-password', sessionValidators.forgot, SessionController.forgot);
routes.get('/reset-password', SessionController.resetForm);
routes.post('/reset-password', sessionValidators.reset, SessionController.reset);

/* USERS */

routes.get('/', UsersController.index);

routes.get('/create', UsersController.create);
routes.post('/', UsersController.post);

module.exports = routes;