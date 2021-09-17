const { compare } = require('bcrypt');
const User = require('../models/users');

async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email }
  });

  if (!user) return res.send('User does not exist!');

  const passed = await compare(password, user.password);

  if (!passed) return res.send('Invalid email or password');

  req.user = user;

  next();
}

async function forgot(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email }
  });

  if (!user) return res.send('User does not exist!');

  req.user = user;

  next();
}

async function reset(req, res, next) {
  const { email, password, passwordRepeat } = req.body;

  const user = await User.findOne({
    where: { email }
  });

  if (!user) return res.send('User does not exist!');

  if (password != passwordRepeat) return res.send('Password Mismatch! Please, try again!');

  req.user = user;

  next();
}


module.exports = {
  login,
  forgot,
  reset
}