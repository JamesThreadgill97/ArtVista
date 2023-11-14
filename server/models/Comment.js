const db = require('../database/connect');

class Comment {
  constructor(data) {
    this.id = data.comment_id;
    this.user_id = data.user_id;
    this.content = data.content;
    this.art_id = data.art_id;
  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM comments WHERE comment_id = $1;', [
      id
    ]);
    if (response.rows.length !== 1) {
      throw new Error('Unable to find comment.');
    }

    return new Comment(response.rows[0]);
  }

  static async create(data) {
    const { user_id, art_id, content } = data;
    const response = await db.query(
      'INSERT INTO comments (user_id, art_id, content) VALUES ($1, $2, $3) RETURNING *;',
      [user_id, art_id, content]
    );
    return new Comment(response.rows[0]);
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM comments WHERE comment_id = $1 RETURNING *;',
      [this.id]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to delete comment from table.');
    }
    return new Comment(response.rows[0]);
  }
}

module.exports = Comment;
