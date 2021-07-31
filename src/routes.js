const express = require("express");
const multer = require("./app/middlewares/multer");
const Categories = require("./app/controller/CategoriesController");
const Products = require("./app/controller/ProductsController");

const routes = express.Router();

/* Public Access */
routes.get("/", (req, res) => {
  return res.render("publicAccess/index");
});

/* Private Access */

routes.get('/admin/categories', Categories.index);
routes.get('/admin/categories/create', Categories.create);
routes.get('/admin/categories/:id', Categories.show);
routes.get('/admin/categories/:id/edit', Categories.edit);

routes.post("/admin/categories", Categories.post);
routes.put("/admin/categories", Categories.put);
routes.delete("/admin/categories", Categories.delete);



routes.get("/admin/products", Products.index);
routes.get("/admin/products/create", Products.create);
routes.get("/admin/products/:id", Products.show);
routes.get("/admin/products/:id/edit", Products.edit);

routes.post("/admin/products", multer.array("photo", 4), Products.post);
routes.put("/admin/products", multer.array("photo", 4), Products.put);
routes.delete("/admin/products", Products.delete);

module.exports = routes;
