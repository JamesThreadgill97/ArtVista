const { Router } = require('express');

const authenticator = require('../middleware/authenticator');
const commentController = require('../controllers/comment');

const commentRouter = Router();

commentRouter.post('/', authenticator, commentController.create);
commentRouter.delete('/:id', authenticator, commentController.destroy);

module.exports = commentRouter;