const db = require('../database/connect');

class User {
  constructor({ user_id, username, password, profile_url, bio, contact_url }) {
    this.id = user_id;
    this.username = username;
    this.password = password;
    this.profile_url = profile_url;
    this.bio = bio;
    this.contact_url = contact_url;
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
    const { username, password, profile_url } = data;
    let response = await db.query(
      'INSERT INTO Users (username, password, profile_url) VALUES ($1, $2, $3) RETURNING user_id;',
      [username, password, profile_url]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }

  async update(data) {
    const { bio, contact_url } = data;
    const response = await db.query(
      'UPDATE Users SET bio = $1, contact_url = $2 WHERE user_id = $3 RETURNING *;',
      [bio, contact_url, this.id]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to update user.');
    }
    return new User(response.rows[0]);
  }




}

module.exports = User;
