const data = require("../../productData");

module.exports = {
  index(req, res) {
    return res.render("publicAccess/signUp/index");
  },
  create(req, res) {
    return res.send("Everything is fine");
  },
};
