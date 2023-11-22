const db = require('../database/connect');

class User {
  constructor({ user_id, username, password }) {
    this.id = user_id;
    this.username = username;
    this.password = password;

  }

  static async getOneById(id) {
    const response = await db.query('SELECT * FROM Users WHERE user_id = $1', [
      id,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query('SELECT * FROM Users WHERE username = $1', [
      username,
    ]);
    if (response.rows.length != 1) {
      throw new Error('Unable to locate user.');
    }
    return new User(response.rows[0]);
  }

  static async create(data) {
    const { username, password } = data;
    let response = await db.query(
      'INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING user_id;',
      [username, password]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }

  async update(data) {
    const { bio, profile_url } = data;
    const response = await db.query(
      'UPDATE Users SET bio = $1, profile_url = $2 WHERE user_id = $3 RETURNING *;',
      [bio, profile_url, this.id]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to update user.');
    }
    return new User(response.rows[0]);
  }




}

module.exports = User;
