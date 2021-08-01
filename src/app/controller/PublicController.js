const Product = require("../models/Product");
const { formatPrice } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    try {
      const results = await Product.all();
      const products = results.rows;

      for (product of products) {
        product.price = formatPrice(product.price);
      }

      return res.render("publicAccess/index.njk", { products });
    } catch (err) {
      throw new Error(err);
    }
  }
}