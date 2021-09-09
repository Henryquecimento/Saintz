
module.exports = {
	loginForm(req, res) {

		return res.render('admin/users/login.njk')
	},
	login(req, res) {
		req.session.userId = req.user.id;
		req.session.isAdmin = req.user.is_admin;

		return res.redirect('/admin/products');
	},
	/* ,
	logout(req, res) {

	},
	resetForm(req, res) {

	},
	reset(req, res) {

	} 
	*/

};
