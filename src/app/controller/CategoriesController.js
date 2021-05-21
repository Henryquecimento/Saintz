const Category = require('../models/Category');
const Product = require('../models/Product');

module.exports = {
    async index(req, res) {
        const results = await Category.all();
        const categories = results.rows;

        return res.render('admin/categories/index.njk', { categories });
    },
    async show(req, res) {
        const results = await Category.find(req.params.id);
        const category = results.rows[0];

        return res.render(`admin/categories/show`, { category });
    }
}