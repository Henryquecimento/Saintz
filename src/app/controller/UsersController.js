const User = require('../models/users');
const crypto = require('crypto');
const { hash } = require('bcrypt');


module.exports = {
	index(req, res) {
		return res.render('admin/users/index.njk');
	},
	create(req, res) {
		return res.render('admin/users/create.njk');
	},
	async post(req, res) {
		const { name, email } = req.body;

		const firstPassword = crypto.randomBytes(20).toString('hex');
		const encryptedPassword = await hash(firstPassword, 8);

		await User.post({
			name,
			email,
			password: encryptedPassword
		});

		return res.redirect('/admin/users');
	},
};
