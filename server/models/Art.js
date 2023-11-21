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
    const response = await db.query('SELECT * FROM art WHERE art_id = $1;', [id]);
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
    const response = await db.query('SELECT * FROM artTags WHERE tag_id = $1', [tag_id])
    if (response.rows.length === 0) {
      throw new Error('Unable to locate art.');
    }

    return response.rows;
  }


  static async isLiked(user_id, art_id) {
    const response = await db.query('SELECT * FROM userLikes WHERE art_id = $1 AND user_id = $2', [art_id, user_id]);
    if (response.rows.length === 0) {
      return false;
    }
    return true;
  }

  static async addLike(user_id, art_id) {
    const response = await db.query('INSERT INTO userLikes (user_id, art_id) VALUES ($1, $2) RETURNING *', [user_id, art_id])
    if (response.rows.length === 0) {
      throw new Error('Unable to add like.');
    }
    return response.rows[0];
  }

  static async deleteLike(user_id, art_id) {
    const response = await db.query('DELETE FROM userLikes WHERE user_id = $1 AND art_id = $2 RETURNING *', [user_id, art_id])
    if (response.rows.length !== 1) {
      throw new Error('Unable to delete like from table.');
    }
    return new Art(response.rows[0]);
  }




  static async getTagsById(art_id) {
    const response = await db.query('SELECT * FROM artTags JOIN tags ON artTags.tag_id = tags.tag_id WHERE artTags.art_id = $1', [art_id])
    if (response.rows.length === 0) {
      throw new Error('Unable to locate tags.');
    }

    return response.rows;
  }

  static async getAllWithCommonTag(art_id) {
    const response = await db.query('SELECT DISTINCT a.art_id AS id, a.* FROM Art a JOIN arttags at1 ON a.art_id = at1.art_id JOIN arttags at2 ON at1.tag_id = at2.tag_id WHERE at2.art_id = $1 AND a.art_id <> $1;', [art_id])
    if (response.rows.length === 0) {
      throw new Error('Unable to locate artworks.');
    }

    return response.rows;
  }



  static async uploadAndCreate(data, file, tag_ids) {
    const { user_id, title, description, likes } = data;

    // Upload the file to Cloud Storage
    const publicUrl = await this.uploadFileToStorage(file);

    // Create a new art entry in the database
    const response = await db.query(
      'INSERT INTO art (user_id, title, description, likes, url) VALUES ($1, $2, $3, $4, $5) RETURNING art_id;',
      [user_id, title, description, likes, publicUrl]
    );

    const artId = response.rows[0].art_id;

    // Associate the art piece with multiple tags
    for (let i = 0; i < tag_ids.length; i++) {
      const tag_id = tag_ids[i]
      if (tag_id != ',') {
        await db.query('INSERT INTO artTags (art_id, tag_id) VALUES ($1, $2);', [artId, tag_id]);
      }
    }

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
