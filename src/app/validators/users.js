const { compare } = require('bcrypt');
const User = require('../models/users');

async function show(req, res, next) {
  const { userId: id } = req.session;

  const user = await User.findOne({
    where: { id }
  });

  if (!user) return res.send('User does not exist');

  req.user = user;

  next();

}

async function update(req, res, next) {
  const { id, password } = req.body;

  if (!password) return res.send('Insert the password first to save the changes')

  const user = await User.findOne({
    where: { id }
  });

  const passed = await compare(password, user.password);

  if (!passed) return res.send('Invalid password! Please, try again!')

  req.user = user;

  next();
}

async function edit(req, res, next) {
  const { password } = req.body;

  if (!password) return res.send('Insert the password first to save the changes')

  const result = await User.find(req.session.userId);
  const userAdmin = result.rows[0];

  const passed = await compare(password, userAdmin.password);

  if (!passed) return res.send('Invalid password! Please, try again!')

  next();
}

module.exports = {
  show,
  update,
  edit
}