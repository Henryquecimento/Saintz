function onlyAdmin(req, res, next) {
  if (!req.session.isAdmin) {
    return res.redirect('/users/login');
  }

  next();
}

module.exports = {
  onlyAdmin
}