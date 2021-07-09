const db = require('../../config/db');

module.exports = {
  async create({ name, path }) {

    return db.query(`
      INSERT INTO files (
        name,
        path
      ) VALUES ($1, $2)
      RETURNING id    
    `, [name, path]);
  }
}