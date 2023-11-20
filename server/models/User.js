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

  static async uploadAndCreate(data, file) {
    const { username, password } = data;
    // Upload the file to Cloud Storage
    const publicUrl = await this.uploadFileToStorage(file);
    // Create a new art entry in the database
    const response = await db.query(
      'INSERT INTO Users (username, password, profile_url) VALUES ($1, $2, $3) RETURNING user_id;',
      [username, password, publicUrl]
    );
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
    // Associate the art piece with multiple tags

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

  //todo: update method for user
  static async update(id, data, file) {
    
      const { username, password } = data;
      const file = file
      // Upload the file to Cloud Storage
      const publicUrl = await this.uploadFileToStorage(file);
      // Create a new art entry in the database
      const response = await db.query(
        'UPDATE Users SET username = $1, password = $2, profile_url = $3 WHERE user_id = $4 RETURNING *;',
        [username, password, publicUrl, id]
      );
      const updatedId = response.rows[0].user_id;
      const updatedUser = await User.getOneById(updatedIdId);
      return updatedUser;    
  }
}







module.exports = User;
