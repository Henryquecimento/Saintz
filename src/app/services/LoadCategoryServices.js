const Category = require("../models/Category");

const LoadCategory = {
  load(service, filters) {
    this.filters = filters;

    return this[service]();
  },
  async category() {
    const category = await Category.findOne(this.filters);

    return category;
  },
  async categories() {
    const categories = await Category.findAll(this.filters);

    return categories;
  }
}

module.exports = {
  LoadCategory
}
