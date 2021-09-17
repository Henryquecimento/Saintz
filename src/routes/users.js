const express = require("express");

const SessionController = require('../app/controller/SessionController');
const UsersController = require('../app/controller/UsersController');
const ProfileController = require('../app/controller/ProfileController');

const sessionValidators = require('../app/validators/session');
const userValidators = require('../app/validators/users');

const { onlyUsers, userIsLogged } = require('../app/middlewares/session');
const { onlyAdmin } = require('../app/middlewares/users');

const routes = express.Router();

routes.get('/login', userIsLogged, SessionController.loginForm);
routes.post('/login', sessionValidators.login, SessionController.login);
routes.post('/logout', SessionController.logout);
routes.get('/forgot-password', SessionController.forgotForm);
routes.post('/forgot-password', sessionValidators.forgot, SessionController.forgot);
routes.get('/reset-password', SessionController.resetForm);
routes.post('/reset-password', sessionValidators.reset, SessionController.reset);

/* USERS */
routes.get('/profile', onlyUsers, userValidators.show, ProfileController.index);
routes.put('/profile', userValidators.update, ProfileController.put);

routes.get('/', onlyUsers, UsersController.index);

routes.get('/create', UsersController.create);
routes.post('/', UsersController.post);
routes.get('/:id/edit', onlyUsers, onlyAdmin, UsersController.edit);
routes.put('/', userValidators.edit, UsersController.put);
routes.delete('/', onlyAdmin, UsersController.delete);


module.exports = routes;