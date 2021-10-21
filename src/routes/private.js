const express = require("express");
const multer = require("../app/middlewares/multer");

const Categories = require("../app/controller/CategoriesController");
const Products = require("../app/controller/ProductsController");

const { onlyUsers } = require('../app/middlewares/session');

const routes = express.Router();

routes.get('/categories', onlyUsers, Categories.index);
routes.get('/categories/create', onlyUsers, Categories.create);
routes.get('/categories/:id', onlyUsers, Categories.show);
routes.get('/categories/:id/edit', onlyUsers, Categories.edit);

routes.post("/categories", Categories.post);
routes.put("/categories", Categories.put);
routes.delete("/categories", Categories.delete);

routes.get("/products", onlyUsers, Products.index);
routes.get("/products/create", onlyUsers, Products.create);
routes.get("/products/:id", onlyUsers, Products.show);
routes.get("/products/:id/edit", onlyUsers, Products.edit);

routes.post("/products", multer.array("photo", 4), Products.post);
routes.put("/products", multer.array("photo", 4), Products.put);
routes.delete("/products", Products.delete);

module.exports = routes;
