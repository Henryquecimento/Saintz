const Category = require("../models/Category");
const Product = require("../models/Product");

module.exports = {
	async index(req, res) {
		try {
			const results = await Category.all();
			const categories = results.rows;

			return res.render("admin/categories/index.njk", { categories });
		} catch (err) {
			throw new Error(err);
		}

	},
	create(req, res) {
		return res.render("admin/categories/create.njk");
	},
	async post(req, res) {
		try {
			const keys = Object.keys(req.body);

			for (key of keys) {
				if (req.body[key] == "") {
					return res.send("Please, you must fill all the fields up!");
				}
			}

			const categoryId = await Category.create({
				name: req.body.name
			});

			return res.redirect(`/admin/categories/${categoryId}`);
		} catch (err) {
			throw new Error(err);
		}


	},
	async show(req, res) {
		try {
			let results = await Category.find(req.params.id);
			const category = results.rows[0];

			results = await Product.findByCategory(req.params.id);
			const products = results.rows;

			return res.render("admin/categories/show", { category, products });
		} catch (err) {
			throw new Error(err);
		}
	},
	async edit(req, res) {
		try {
			const results = await Category.find(req.params.id);
			const category = results.rows[0];

			return res.render("admin/categories/edit.njk", { category });
		} catch (err) {
			throw new Error(err);
		}
	},
	async put(req, res) {
		try {
			const keys = Object.keys(req.body);

			for (key of keys) {
				if (req.body[key] == "") {
					return res.send("Please, you must fill all the fields up!");
				}
			}

			await Category.update(req.body);

			return res.redirect(`/admin/categories/${req.body.id}`);
		} catch (err) {
			throw new Error(err);
		}
	},
	async delete(req, res) {
		try {
			const results = await Product.findByCategory(req.body.id);
			const products = results.rows;

			if (products.length == 0) {
				await Category.delete(req.body.id);

				return res.redirect('/admin/categories');
			} else {

				return res.send("Category can not be deleted!")
			}

		} catch (err) {
			throw new Error(err);
		}

	}
};
