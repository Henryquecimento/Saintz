const User = require('../models/users');
const crypto = require('crypto');
const { hash } = require('bcrypt');
const mailer = require('../../lib/mailer');

module.exports = {
	index(req, res) {
		const { user } = req;

		return res.render('admin/users/profile.njk', { user });
	},
	async put(req, res) {
		const { user } = req;

		const { name, email } = req.body;

		await User.update(user.id, {
			name,
			email
		});

		return res.redirect('/users');
	},

};
