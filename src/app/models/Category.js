const db = require("./../../config/db");

module.exports = {
  all() {
    return db.query(`
      SELECT * 
      FROM categories
      ORDER BY id
    `);
  },
  create(data) {
    const query = `
      INSERT INTO categories (
        name
      ) VALUES ($1)
      RETURNING id`;

    return db.query(query, [data.name]);
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
  },
  update(data) {
    const query = `
      UPDATE categories SET
        name = ($1)
      WHERE id = $2    
    `;

    const values = [
      data.name,
      data.id
    ];

    return db.query(query, values);
  }
};
