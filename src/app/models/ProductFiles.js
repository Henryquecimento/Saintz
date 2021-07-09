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
  }
}