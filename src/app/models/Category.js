const db = require("./../../config/db");
const Base = require('./Base');

Base.init({ table: 'categories' });

module.exports = {
  ...Base,
  all() {
    return db.query(`
      SELECT * 
      FROM categories
      ORDER BY id
    `);
  },
  find(id) {
    return db.query(`
      SELECT categories.*
      FROM categories
      WHERE categories.id = $1
    `, [id]);
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
  },
  delete(id) {
    return db.query(`
      DELETE FROM categories  
      WHERE id = $1
    `, [id])
  }
};
