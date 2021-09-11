const db = require("./../../config/db");

module.exports = {
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
  }
};
