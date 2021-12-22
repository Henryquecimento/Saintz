const User = require("../models/User");

const LoadUsers = {
  load(service, filters) {
    this.filters = filters;

    return this[service]();
  },
  async user() {
    const user = await User.findOne(this.filters);

    return user;
  },
  async users() {
    const users = await User.findAll(this.filters);

    return users;
  }
}

module.exports = {
  LoadUsers
}