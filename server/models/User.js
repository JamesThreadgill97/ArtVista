const { log } = require('console');
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

  static async uploadAndCreate(data, file) {
    const { username, password } = data;
    // Upload the file to Cloud Storage
    let publicUrl
    if (file == null || file == undefined) {
      publicUrl = 'https://storage.googleapis.com/artvista-images/default_profile.png'
    } else {
      publicUrl = await this.uploadFileToStorage(file);
    }

    // Create a new art entry in the database
    const response = await db.query(
      'INSERT INTO Users (username, password, profile_url) VALUES ($1, $2, $3) RETURNING user_id;',
      [username, password, publicUrl]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;

  }
  // Add a new method for uploading files to Cloud Storage
  static async uploadFileToStorage(file) {
    const { Storage } = require('@google-cloud/storage');
    const { format } = require('util');
    const cloudStorage = new Storage({
      keyFilename: `./service_account_key.json`,
      projectId: 'artvista-405109',
    });
    const bucketName = 'artvista-images';
    const bucket = cloudStorage.bucket(bucketName);

    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();
    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        reject(err);
      });
      blobStream.on('finish', () => {
        const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
        resolve(publicUrl);
      });
      blobStream.end(file.buffer);
    });
  }
  async update(data, file) {
    const { bio, contact_url } = data;
    let publicUrl

    if (file == null || file == undefined) {
      publicUrl = 'https://storage.googleapis.com/artvista-images/default_profile.png'
    } else {
      publicUrl = await this.uploadFileToStorage(file);
    }

    const response = await db.query(
      'UPDATE Users SET bio = $1, contact_url = $2, profile_url = $3 WHERE user_id = $4 RETURNING *;',
      [bio, contact_url, publicUrl, this.id]
    );
    if (response.rows.length !== 1) {
      throw new Error('Unable to update user.');
    }

    const userId = response.rows[0].user_id;
    const updatedUser = await User.getOneById(userId);
    return updatedUser;
  }
}







module.exports = User;