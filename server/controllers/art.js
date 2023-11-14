const Art = require('../models/Art.js');

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


async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const art = await Art.getOneById(id);
    res.status(200).json(art);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const create = async (req, res) => {
  try {
    const data = req.body;
    const newArt = await Art.create(data);
    res.status(201).send(newArt);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

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


module.exports = { index, show, create, comments, update, destroy };
