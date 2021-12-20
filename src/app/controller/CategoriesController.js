const Category = require("../models/Category");
const Product = require("../models/Product");
const { LoadCategory } = require("../services/LoadCategoryServices");

module.exports = {
	async index(req, res) {
		try {
			const categories = await LoadCategory.load("categories");

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
			const category = await LoadCategory.load("category", {
				where: {
					id: req.params.id
				}
			});

			const products = await Product.findByCategory(req.params.id);

			return res.render("admin/categories/show", { category, products });
		} catch (err) {
			throw new Error(err);
		}
	},
	async edit(req, res) {
		try {
			const category = await Category.findOne({
				where: {
					id: req.params.id
				}
			});

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

			await Category.update(req.body.id, {
				name: req.body.name
			});

			return res.redirect(`/admin/categories/${req.body.id}`);
		} catch (err) {
			throw new Error(err);
		}
	},
	async delete(req, res) {
		try {
			const products = await Product.findByCategory(req.body.id);

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
