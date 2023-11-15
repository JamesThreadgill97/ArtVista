const { Router } = require('express');
const multer = require('multer');
const artController = require('../controllers/art');

const artRouter = Router();
const upload = multer(); // Initialize Multer

artRouter.get('/', artController.index);
artRouter.get('/:id', artController.show);
artRouter.get('/:id/comments', artController.comments);
artRouter.post('/', upload.single('file'), artController.create); // Use Multer middleware for file upload
artRouter.patch('/:id', artController.update);
artRouter.delete('/:id', artController.destroy);

module.exports = artRouter;