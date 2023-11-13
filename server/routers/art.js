const { Router } = require('express');

const authenticator = require('../middleware/authenticator');
const artController = require('../controllers/art');

const artRouter = Router();

artRouter.get('/', artController.index);
artRouter.get('/:id', artController.show);
artRouter.get('/:id/comments', artController.comments)
artRouter.post('/', artController.create);
artRouter.patch('/:id', artController.update);
artRouter.delete('/:id', artController.destroy);

module.exports = artRouter;