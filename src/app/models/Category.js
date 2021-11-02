const db = require("./../../config/db");
const Base = require('./Base');

Base.init({ table: 'categories' });

module.exports = {
  ...Base,
  delete(id) {
    return db.query(`
      DELETE FROM categories  
      WHERE id = $1
    `, [id])
  }
};