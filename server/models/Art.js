const db = require('../database/connect');

class Art {
  constructor(data) {
    this.id = data.art_id;
    this.user_id = data.user_id;
    this.title = data.title;
    this.description = data.description;
    this.likes = data.likes;
  }

  static async getAll() {
    const response = await db.query('SELECT * from art');
    if (response.rows.length === 0) {
      throw new Error('No art available.');
    }
    return response.rows.map((g) => new Art(g));
  }

  static async getAllByUser({ user_id }) {
    const response = await db.query(
      'SELECT * from art WHERE user_id = $1 ;',
      [user_id]
    );
    if (response.rows.length === 0) {
      throw new Error('No art available.');
    }
    return response.rows.map((g) => new Art(g));
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM art WHERE art_id = $1;', [
      id,
    ]);
    if (response.rows.length !== 1) {
      throw new Error('Unable to locate art.');
    }

    return new Art(response.rows[0]);
  }

  static async getCommentsById(id) {
    const response = await db.query('SELECT * FROM comments WHERE art_id = $1;', [
      id
    ]);
    if (response.rows.length === 0) {
      return "no comments"
    }

    return response.rows;
  }
  
static async getAllByTag(tag_id) {
  const response = await db.query('SELECT * FROM art WHERE tag_id = $1', [tag_id])
  if (response.rows.length === 0) {
    throw new Error('Unable to locate art.');
  }

  return response.rows;
}



  static async create(data) {
    const { user_id, title, description, likes, tag_id, url } = data;
    console.log("is it this bit");
    const response = await db.query(
      'INSERT INTO art (user_id, tag_id, title, description, likes, url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [user_id, tag_id, title, description, likes, url]
    );
    console.log("we made it to the end");
    return new Art(response.rows[0]);
  }

  async update(data) {
    const { user_id, title, description, likes, tag_id} = data;
    const response = await db.query(
      'UPDATE art SET user_id = $1, title = $2, description = $3, likes = $4, tag_id = $5 WHERE art_id = $6 RETURNING *;',
      [user_id, title, description, likes, tag_id, this.id]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to update art.');
    }
    return new Art(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM art WHERE art_id = $1 RETURNING *;',
      [this.id]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to delete art from art table.');
    }
    return new Art(response.rows[0]);
  }
}

module.exports = Art;
