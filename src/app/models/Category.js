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
      SELECT *,
      FROM categories
      WHERE id = $1
    `

    return db.query(query, [id]);
  }
};
