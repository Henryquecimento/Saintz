const { LoadProduct } = require('../services/LoadProductServices');

module.exports = {
  async index(req, res) {
    try {
      const products = await LoadProduct.load("products");

      return res.render("publicAccess/index.njk", { products });
    } catch (err) {
      throw new Error(err);
    }
  },
  async products(req, res) {
    try {
      const product = await LoadProduct.load("product", {
        where: {
          id: req.params.id
        }
      });

      return res.render("publicAccess/products/show.njk", { product });
    } catch (err) {
      throw new Error(err);
    }
  }
}