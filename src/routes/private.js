const express = require("express");
const multer = require("../app/middlewares/multer");

const Categories = require("../app/controller/CategoriesController");
const Products = require("../app/controller/ProductsController");

const routes = express.Router();

routes.get('/categories', Categories.index);
routes.get('/categories/create', Categories.create);
routes.get('/categories/:id', Categories.show);
routes.get('/categories/:id/edit', Categories.edit);

routes.post("/categories", Categories.post);
routes.put("/categories", Categories.put);
routes.delete("/categories", Categories.delete);

routes.get("/products", Products.index);
routes.get("/products/create", Products.create);
routes.get("/products/:id", Products.show);
routes.get("/products/:id/edit", Products.edit);

routes.post("/products", multer.array("photo", 4), Products.post);
routes.put("/products", multer.array("photo", 4), Products.put);
routes.delete("/products", Products.delete);

module.exports = routes;
