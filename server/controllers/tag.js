const Tag = require("../models/Tag.js");

async function index(req, res) {
  try {
    const items = await Tag.getAllTags();
    res.status(200).send({ data: items });

  } catch (err) {
    res.status(500).send({ 'error': err.message })
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id);
    const tag = await Tag.getOneById(id);
    res.status(200).send({ data: tag });
  } catch (err) {
    res.status(404).send({ "error": err.message })
  }
}

async function getByName(req, res) {
  try {
    const name = req.params.tag;
    const tag = await Tag.getOneByName(name);
    res.status(200).send({ data: tag });
  } catch (err) {
    res.status(404).send({ "error": err.message })
  }
}

module.exports = {
  index, show, getByName
}
