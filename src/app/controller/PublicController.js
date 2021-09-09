const Product = require("../models/Product");
const ProductFiles = require("../models/ProductFiles");
const { formatPrice } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    try {
      let results = await Product.all();
      let products = results.rows;

      for (product in products) {
        results = await ProductFiles.findById(products[product].id);
        let files = results.rows.map(file => ({
          ...file,
          filename: file.name,
          src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
        }));

        products[product] = {
          ...products[product],
          files
        }

        products[product].price = formatPrice(products[product].price);
        products[product].old_price = formatPrice(products[product].old_price);
      }

      return res.render("publicAccess/index.njk", { products });
    } catch (err) {
      throw new Error(err);
    }
  }
}