const Category = require('../models/Category');

module.exports = {
    async index(req, res) {
        const results = await Category.all();
        const categories = results.rows;

        console.log(categories)

        return res.render('admin/categories/index.njk', { categories });
    }

}