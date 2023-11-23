const { Router } = require('express');
const multer = require('multer');
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/user');
const upload = multer(); // Initialize Multer
const userRouter = Router();

userRouter.post('/register', upload.single('file'), userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/showId', userController.getUserId);
userRouter.get("/userInfo/:id", userController.getUserInfo); //gets user's username (and profile pic?) with id. Allows user's to see other users' username in comment section, profile section, etc.
userRouter.patch('/update/:id', authenticator, userController.update)
module.exports = userRouter;
