const User = require('../models/users');

async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email }
  });

  if (!user) return res.send('User does not exist!');

  /* const passed = '1234'; */

  /* if (!password != '1234') return res.send('Invalid email or password'); */

  req.user = user;

  next();
}

module.exports = {
  login
}