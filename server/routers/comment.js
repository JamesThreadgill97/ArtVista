const { Router } = require('express');

const authenticator = require('../middleware/authenticator');
const commentController = require('../controllers/comment');

const commentRouter = Router();

commentRouter.post('/', commentController.create);
commentRouter.delete('/:id', commentController.destroy);

module.exports = commentRouter;