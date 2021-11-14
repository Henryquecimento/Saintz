const db = require("./../../config/db");

const Base = require('./Base');

Base.init({ table: "products" });

module.exports = {
  ...Base,
  find(id) {
    const query = `SELECT products.*,
      (SELECT name FROM categories WHERE categories.id = products.category_id) as category_name
      FROM products
      LEFT JOIN categories ON (products.category_id = categories.id)
      WHERE products.id = $1`;
    return db.query(query, [id]);
  },
  findByCategory(id) {
    return db.query(`
      SELECT products.*
      FROM products
      LEFT JOIN categories ON (products.category_id = categories.id)
      WHERE products.category_id = $1
      `, [id]);
  },
  update(data) {
    const query = `
      UPDATE products SET
        category_id = ($1),
        user_id = ($2),
        name = ($3),
        description = ($4),
        old_price = ($5),
        price = ($6),
        quantity = ($7),
        status = ($8)
      WHERE id = $9
    `;

    const values = [
      data.category_id,
      data.user_id,
      data.name,
      data.description,
      data.old_price,
      data.price,
      data.quantity,
      data.status,
      data.id,
    ];

    return db.query(query, values);
  },
  delete(id) {
    return db.query(`DELETE FROM products WHERE id = $1`, [id]);
  }
};
