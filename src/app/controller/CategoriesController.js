const Category = require('../models/Category');
const { update } = require('../models/Product');
const Product = require('../models/Product');
const { create, edit } = require('./ProductsController');

module.exports = {
    async index(req, res) {
        const results = await Category.all();
        const categories = results.rows;

        return res.render('admin/categories/index.njk', { categories });
    },
    create(req, res) {
        return res.render('admin/categories/create.njk');
    },
    async post(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("`Please, you must fill all the fields up!");
            }
        }

        const results = await Category.create(req.body);
        const categoryId = results.rows[0].id;
        console.log(categoryId)
        return res.redirect(`/admin/categories`);
    },
    async show(req, res) {
        const results = await Category.find(req.params.id);
        const category = results.rows[0];

        return res.render(`admin/categories/show`, { category });
    },
    async edit(req, res) {
        const results = await Category.find(req.params.id);
        const category = results.rows[0];

        return res.render("admin/categories/edit.njk", { category });
    },
    async put(req, res) {
        const keys = Object.keys(req.body);

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send("`Please, you must fill all the fields up!");
            }
        }

        await Category.update(req.body);

        return res.redirect(`/admin/categories/${req.body.id}`);
    },
    delete(req, res) { }
}