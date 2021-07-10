const db = require('../../config/db');

module.exports = {
  async create({ filename, path, productID }) {
    let query = `
      INSERT INTO files (
        name,
        path
      ) VALUES ($1, $2)
      RETURNING id    
    `;

    let values = [filename, path];

    const result = await db.query(query, values);
    const fileId = result.rows[0].id;

    query = `
      INSERT INTO product_files (
        file_id,
        product_id
      ) VALUES ($1, $2)
      RETURNING id    
    `;

    values = [fileId, productID];

    return db.query(query, values);
  },
  findById(id) {
    return db.query(`
      SELECT files.*
      FROM files
      INNER JOIN product_files ON (files.id = product_files.file_id)
      WHERE product_files.product_id = $1
    `, [id]);
  }
}