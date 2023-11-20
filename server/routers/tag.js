const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const tagController = require('../controllers/tag');

const tagRouter = Router();


tagRouter.get('/', tagController.index);
tagRouter.get('/:id', tagController.show);
tagRouter.get('/name/:tag', tagController.getByName);


module.exports = tagRouter;
