const { Router } = require('express');

const authenticator = require('../middleware/authenticator');
const artController = require('../controllers/art');

const artRouter = Router();

artRouter.get('/', authenticator, artController.index);
artRouter.get('/:id', authenticator, artController.show);
artRouter.post('/', authenticator, artController.create);
artRouter.patch('/:id', authenticator, artController.update);
artRouter.delete('/:id', authenticator, artController.destroy);

module.exports = artRouter;