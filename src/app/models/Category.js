const db = require("./../../config/db");

module.exports = {
  all() {
    return db.query(`
      SELECT * 
      FROM categories
      ORDER BY id
    `);
  },
  find(id) {
    const query = `
      SELECT categories.*,
      Array(SELECT name FROM products WHERE products.category_id = categories.id) AS total_products
      FROM categories
      LEFT JOIN products ON (categories.id = products.category_id)
      WHERE categories.id = $1
      GROUP BY categories.id
    `

    return db.query(query, [id]);
  }
};
