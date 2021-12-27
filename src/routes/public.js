const express = require("express");

const PublicController = require("../app/controller/PublicController");

const routes = express.Router();

/* Public Access */
routes.get("/", PublicController.index);

routes.get('/products', PublicController.products);
routes.get('/products/:id', PublicController.product);

routes.get('/about', PublicController.about);

module.exports = routes;