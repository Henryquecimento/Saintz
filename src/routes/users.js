const express = require("express");

const SessionController = require('../app/controller/SessionController');
const UsersController = require('../app/controller/UsersController');
const ProfileController = require('../app/controller/ProfileController');

const sessionValidators = require('../app/validators/session');
const userValidators = require('../app/validators/users');

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

routes.get('/profile', userValidators.show, ProfileController.index);
routes.put('/profile', userValidators.update, ProfileController.put);

module.exports = routes;