const express = require("express");
const productData = require("./productData");
const signUp = require("./app/controller/SignUpController");
const Products = require("./app/controller/ProductsController");

const routes = express.Router();

/* Public Access */
routes.get("/", (req, res) => {
  return res.render("publicAccess/index", { products: productData });
});
routes.get("/cart", (req, res) => {
  return res.render("publicAccess/cart/index");
});

/* Subscription */
routes.get("/signUp", signUp.index);
routes.post("/signUp", signUp.create);

/* Private Access */

routes.get("/admin/products", Products.create);

module.exports = routes;
