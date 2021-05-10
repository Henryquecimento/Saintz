const db = require("./../../config/db");

module.exports = {
  create(req, res) {
    return res.render("admin/products/create.njk");
  },
};
