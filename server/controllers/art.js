const Art = require('../models/Art.js');
const { search } = require('../routers/art.js');

async function index(req, res) {
  try {
    const arts = await Art.getAll();
    res.status(200).json(arts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function comments(req, res) {
  try {
    const id = parseInt(req.params.id);
    const comments = await Art.getCommentsById(id);
    res.status(200).json(comments)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function likes(req, res) {
  try {
    const user_id = req.params.user_id
    const art_id = req.params.art_id
    const liked = await Art.isLiked(user_id, art_id)
    res.status(200).json(liked)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function postLike(req, res) {
  try {
    const user_id = req.params.user_id
    const art_id = req.params.art_id
    const like = await Art.addLike(user_id, art_id)
    res.status(200).json(like)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
async function destroyLike(req, res) {
  try {
    const user_id = req.params.user_id
    const art_id = req.params.art_id
    const like = await Art.deleteLike(user_id, art_id)
    res.status(200).json(like)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const art = await Art.getOneById(id);
    res.status(200).json(art);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function showTags(req, res) {
  try {
    const id = parseInt(req.params.id);
    const tags = await Art.getTagsById(id)
    res.status(200).json(tags);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function showByTags(req, res) {
  try {
    const id = parseInt(req.params.id);
    const arttags = await Art.getAllByTag(id);
    res.status(200).json(arttags);
  } catch (err) {
    res.status(404).json({ error: err.message });

  }
}

async function showAllWithCommonTags(req,res) {
  try {
    const id = parseInt(req.params.id);
    const arts = await Art.getAllWithCommonTag(id)
    res.status(200).json(arts)
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function create(req, res) {
  try {
    const data = req.body;
    const file = req.file;
    const tagIds = req.body.tag_ids; // Assuming the frontend sends tag_ids as an array

    const newArt = await Art.uploadAndCreate(data, file, tagIds);
    res.status(201).json(newArt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function update(req, res) {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const artToUpdate = await Art.getOneById(id);

    const updatedArt = await artToUpdate.update(data);
    res.status(200).json(updatedArt);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id);
    const art = await Art.getOneById(id);
    await art.destroy();
    res.status(204).json({ message: 'Art deleted successfully.' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }

}



module.exports = { index, show, create, comments, likes, postLike, destroyLike, showTags, update, destroy, showByTags , showAllWithCommonTags};
