const Category = require('../models/Category');

module.exports = {
    async index(req, res) {
        const results = await Category.all();
        const categories = results.rows;

        return res.render('admin/categories/index.njk', { categories });
    },
    async show(req, res) {
        const results = await Category.find(req.params.id);
        const category = results.rows[0];

        console.log(category);
        return res.send("Tá Ok!");
    }
}