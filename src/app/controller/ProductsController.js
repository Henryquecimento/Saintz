const db = require("./../../config/db");

module.exports = {
  index(req, res) {
    return res.render("admin/layout");
  },
};
