const bcrypt = require('bcrypt');
const User = require('../../../models/User');
const Token = require('../../../models/Token');
const { login } = require('../../../controllers/user');

jest.mock('bcrypt');
jest.mock('../../../models/User');
jest.mock('../../../models/Token');

describe('User Controller Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should login a user', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User model
    const userMock = {
      id: 'fakeUserId',
      username: 'testuser',
      password: 'hashedPassword',
    };

    jest.spyOn(User, 'getOneById').mockResolvedValue(userMock);

    // Mock bcrypt
    bcrypt.compare.mockResolvedValue(true);

    // Mock Token model
    const tokenMock = {
      token: 'fakeToken',
    };

    Token.create.mockResolvedValue(tokenMock);

    await login(req, res);

  });
});
