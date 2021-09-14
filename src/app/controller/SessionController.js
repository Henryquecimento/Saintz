const User = require('../models/users');
const mailer = require('../../lib/mailer');
const crypto = require('crypto');

module.exports = {
	loginForm(req, res) {

		return res.render('admin/session/login.njk')
	},
	login(req, res) {
		req.session.userId = req.user.id;
		req.session.isAdmin = req.user.is_admin;

		return res.redirect('/admin/products');
	},
	logout(req, res) {
		req.session.destroy();

		return res.redirect('/');
	},
	forgotForm(req, res) {
		return res.render('admin/session/forgot-password.njk');
	},
	async forgot(req, res) {
		const { user } = req;

		const token = crypto.randomBytes(20).toString('hex');
		let now = new Date();
		now = now.setHours(now.getHours() + 1);

		await User.update(user.id, {
			reset_token: token,
			reset_token_expires: now
		})

		await mailer.sendMail({
			to: user.email,
			from: 'no-reply@saintz.com',
			subject: "Password Recovery",
			html: `<h2>Hello ${user.name}! Forgot your password?</h2>
			<p>No problem, you can recovery your password clicking in the link below:</p>
			<p>
				<a href="http://localhost:4000/users/reset-password?${token}" target='_blank'>
				RECOVER YOUR PASSWORD
				</a>		
			</p>
			`
		});


		return res.render('admin/session/login.njk', { token });
	}
	/* ,
	resetForm(req, res) {

	},
	reset(req, res) {

	} 
	*/

};
