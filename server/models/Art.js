const { log } = require('console');
const db = require('../database/connect');

class Art {
  constructor(data) {
    this.id = data.art_id;
    this.user_id = data.user_id;
    this.title = data.title;
    this.description = data.description;
    this.likes = data.likes;
    this.url = data.url;
    this.username = data.username;
  }

  static async getAll() {
    const response = await db.query('SELECT art.*, users.username FROM art INNER JOIN users ON art.user_id = users.user_id;');
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

  static async uploadAndCreate(data, file) {
    const { user_id, title, description, likes, tag_id } = data;
    // Upload the file to Cloud Storage
    const publicUrl = await this.uploadFileToStorage(file);
    // Create a new art entry in the database
    const response = await db.query(
      'INSERT INTO art (user_id, tag_id, title, description, likes, url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [user_id, tag_id, title, description, likes, publicUrl]
    );
    return new Art(response.rows[0]);
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

  // static async searchForArt(search) {
  //   console.log("model")
  //   const stringArr = search.split(' ')
  //   //create SQL command
  //   let sqlCommand = 'SELECT art.*, users.username FROM art INNER JOIN users ON art.user_id = users.user_id ';
  //   //returns everything if search bar is empty
  //   if (stringArr.length == 0) {
  //     const response = await db.query(sqlCommand)

  //     if (response.rows.length === 0) {
  //       throw new Error('No art available.');
  //     }
  //     return response.rows.map((g) => new Art(g));

  //   } else {
  //     for (let i = 0; i < stringArr.length; i++) {
  //       //adds WHERE only for first loop
  //       if (i == 0) { 
  //         //searches title,description and username for i'th string in stringArr
  //         sqlCommand = sqlCommand + ` WHERE LOWER(title) LIKE '%$${i + 1}%' OR LOWER(description) LIKE '%$${i + 1}%' OR LOWER(username) LIKE '%$${i + 1}%'` 
  //       } else {
  //         //same as above, without WHERE
  //         sqlCommand = sqlCommand + ` OR LOWER(title) LIKE '%$${i + 1}%' OR LOWER(description) LIKE '%$${i + 1}%' OR LOWER(username) LIKE '%$${i + 1}%'` 
  //       }
  //     }
  //     const response = await db.query(sqlCommand, stringArr)

  //     if (response.rows.length === 0) {
  //       throw new Error('No art available.');
  //     }
  //     return response.rows.map((g) => new Art(g));
  //   }
  // }

  async update(data) {
    const { user_id, title, description, likes } = data;
    const response = await db.query(
      'UPDATE art SET user_id = $1, title = $2, description = $3, likes = $4 WHERE art_id = $5 RETURNING *;',
      [user_id, title, description, likes, this.id]
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
