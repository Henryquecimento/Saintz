const db = require("./../../config/db");

const Base = require('./Base');

Base.init({ table: "products" });

module.exports = {
  ...Base,
  async findByCategory(id) {
    const results = await db.query(`
    SELECT products.*
    FROM products
    LEFT JOIN categories ON (products.category_id = categories.id)
    WHERE products.category_id = $1
    `, [id]);

    return results.rows;
  }
};
