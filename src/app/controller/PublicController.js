const { LoadProduct } = require('../services/LoadProductServices');

module.exports = {
  async index(req, res) {
    try {
      const products = await LoadProduct.load("products");

      return res.render("publicAccess/index.njk", { products });
    } catch (err) {
      throw new Error(err);
    }
  }
}