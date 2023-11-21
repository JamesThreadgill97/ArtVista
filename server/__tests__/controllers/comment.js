const Comment = require('../models/Comment.js');

const create = async (req, res) => {
    try {
        const data = req.body;
        const newComment = await Comment.create(data);
        res.status(201).send(newComment);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

async function destroy(req, res) {
    try {
        const id = parseInt(req.params.id);
        const comment = await Comment.getOneById(id);
        await comment.destroy();
        res.status(204).json({ message: 'comment deleted successfully.' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
}


module.exports = { create, destroy };
