const { Router } = require('express');

const userController = require('../controllers/user');

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/showId', userController.getUserId);

module.exports = userRouter;
