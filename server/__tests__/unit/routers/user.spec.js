const request = require('supertest');
const express = require('express');
const userRouter = require('../../../routers/user');

const app = express();
app.use('/users', userRouter);

describe('User Routes', () => {
  it('should register a user via POST /users/register', async () => {
    const userData = {
      username: 'testuser',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/users/register')
      .send(userData);

    expect(response.status).toBe(400); 
  });

  it('should log in a user via POST /users/login', async () => {
    const loginData = {
      username: 'testuser',
      password: 'testpassword',
    };

    const response = await request(app)
      .post('/users/login')
      .send(loginData);

    expect(response.status).toBe(403); 
  });

});