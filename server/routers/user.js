const { Router } = require('express');

const userController = require('../controllers/user');

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/showId', userController.getUserId);
userRouter.get("/userInfo/:id", userController.getUserInfo); //gets user's username (and profile pic?) with id. Allows user's to see other users' username in comment section, profile section, etc.
userRouter.patch('/update', userController.update)
module.exports = userRouter;
