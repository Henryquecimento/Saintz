const db = require("./../../config/db");

module.exports = {
  list() {
    return db.query(`
      SELECT * FROM USERS
      ORDER BY updated_at
    `);
  },
  post({ name, email, password }) {
    const query = `
      INSERT INTO users (
        name,
        email,
        password
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;


    return db.query(query, [name, email, password]);
  },
  async update(id, fields) {
    let query = `UPDATE users SET`;

    Object.keys(fields).map((key, index, array) => {
      if ((index + 1) < array.length) {
        query = `
        ${query}
        ${key} = '${fields[key]}',      
      `
      } else {
        query = `
        ${query}
        ${key} = '${fields[key]}'
        WHERE id = ${id}    
      `
      }
    });

    await db.query(query);

    return;
  },
  async find(id) {
    return db.query(`
      SELECT * FROM users
      WHERE id = ${id}
    `);
  },
  async findOne(filters) {
    let query = `SELECT * FROM users`

    Object.keys(filters).map(key => {
      query = `
        ${query}
        ${key}
      `

      Object.keys(filters[key]).map(field => {
        query = `
        ${query}
        ${field} = '${filters[key][field]}'
        `
      });
    });

    const results = await db.query(query);

    return results.rows[0];
  },
  delete(id) {
    return db.query(`
      DELETE FROM users
      WHERE id = ${id}
    `);
  }
};
