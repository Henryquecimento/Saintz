const Product = require("../models/Product");
const Category = require("../models/Category");
const { formatPrice } = require("../../lib/utils");

module.exports = {
  async create(req, res) {
    try {
      const results = await Category.all();
      const categories = results.rows;

      return res.render("admin/products/create.njk", { categories });
    } catch (err) {
      throw new Error(err);
    }
  },
  async post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("`Please, you must fill all the fields up!");
      }
    }

    const results = await Product.create(req.body);
    const productId = results.rows[0].id;

    return res.redirect(`/admin/products/${productId}`);
  },
  async edit(req, res) {
    let results = await Product.find(req.params.id);
    const product = results.rows[0];

    if (!product) return res.send("Product not found!");

    product.old_price = formatPrice(product.old_price);
    product.price = formatPrice(product.price);

    results = await Category.all();
    const categories = results.rows;

    return res.render("admin/products/edit.njk", { product, categories });
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("`Please, you must fill all the fields up!");
      }
    }

    req.body.price = req.body.price.replace(/\D/g, "");

    if (req.body.old_price != req.body.price) {
      const oldProduct = await Product.find(req.body.id);

      req.body.old_price = oldProduct.rows[0].price;
    }

    await Product.update(req.body);

    return res.redirect(`/admin/products/${req.body.id}/edit`);
  },
  async delete(req, res) {
    await Product.delete(req.body.id);

    return res.redirect(`/admin/products/create`);
  },
};