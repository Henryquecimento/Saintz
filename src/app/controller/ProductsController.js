const Product = require("../models/Product");
const Category = require("../models/Category");

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
    const results = await Product.create(req.body);
    const productId = results.rows[0].id;

    return res.redirect(`/admin/products/${productId}`);
  },
  async edit(req, res) {
    let results = await Product.find(req.params.id);
    const product = results.rows[0];

    if (!product) return res.send("Product not found!");

    results = await Category.all();
    const categories = results.rows;

    return res.render("admin/products/edit.njk", { product, categories });
  },
};
