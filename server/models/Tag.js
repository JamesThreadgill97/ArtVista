const db = require("../database/connect")

class Tag {

  constructor({ tag_id, tag }) {
    this.id = tag_id;
    this.tag = tag;
  }

  static async getAllTags() {
    const response = await db.query("SELECT * FROM tags;");
    if (response.rows.length === 0) {
      throw new Error("No tags available.")
    }
    return response.rows.map(g => new Tag(g));
  }

  static async getTagsByArtId(id) {
    const response = await db.query("SELECT tags.* FROM artTags JOIN tags ON artTags.tag_id = tags.tag_id WHERE artTags.art_id = $1;", [id]);
    if(response.rows.length === 0) {
      throw new Error("This art has no tags")
    }
    return response.rows.map(g => new Tag(g))
  }


  static async getOneById(id) {
    const response = await db.query("SELECT * FROM tags WHERE tag_id = $1;", [id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate tag by id.")
    }

    return new Tag(response.rows[0]);
  }

  static async getOneByName(name) {
    const response = await db.query("SELECT * FROM tags WHERE tag = $1;", [name]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate tag by name.")
    }

    return new Tag(response.rows[0]);
  }

}

module.exports = Tag;
