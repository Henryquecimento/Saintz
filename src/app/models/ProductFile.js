const db = require('../../config/db');
const fs = require('fs');

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
  },
  async delete(id) {
    const results = await db.query(`
      SELECT * 
      FROM files 
      WHERE id = $1`, [id]);
    const file = results.rows[0];

    fs.unlinkSync(file.path);

    await db.query(`
      DELETE 
      FROM product_files 
      WHERE id = $1`, [id]);

    return db.query(`
      DELETE
      FROM files
      WHERE id = $1`, [id]);
  }
}