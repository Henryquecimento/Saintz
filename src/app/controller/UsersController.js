const User = require('../models/users');
const crypto = require('crypto');
const { hash } = require('bcrypt');
const mailer = require('../../lib/mailer');

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

		await mailer.sendMail({
			to: email,
			from: 'no-reply@saintz.com',
			subject: "User's Subscription",
			html: `<h2>Hello ${name}, welcome to Saintz!</h2>
			<p>Your login and temporary password is down below:</p>
			<p>
				Email: ${email}</br>
				Password: ${encryptedPassword}
			</p>
			<p>
				<a href="http://localhost:4000/users/login" target='_blank'>
				ACCESS WITH YOUR LOGIN
				</a>		
			</p>
			<p>If you want to change your password now, please access the link down below:</p>
			<p>
				<a href="http://localhost:4000/users/forgot-password" target='_blank'>
				CHANGE YOUR PASSWORD
				</a>		
			</p>
			`
		});

		await User.post({
			name,
			email,
			password: encryptedPassword
		});

		return res.redirect('/admin/users');
	},
};
