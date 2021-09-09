const User = require('../models/users');

async function login(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email }
  });

  req.user = user;

  next();
}

module.exports = {
  login
}