const bcrypt = require('bcrypt');
const User = require('../../../models/User');
const Token = require('../../../models/Token');
const { login, register, getUserId } = require('../../../controllers/user');

jest.mock('bcrypt');
jest.mock('../../../models/User');
jest.mock('../../../models/Token');


describe('User Controller Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    bcrypt.genSalt.mockResolvedValue('fakeSalt');
    bcrypt.hash.mockResolvedValue('hashedPassword');
  });

  test('should register a user', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await register(req, res);

    expect(bcrypt.genSalt).toHaveBeenCalledWith(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    expect(bcrypt.hash).toHaveBeenCalledWith('testpassword', 'fakeSalt');
    expect(User.create).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'hashedPassword',
    });
    expect(res.status).toHaveBeenCalledWith(201);
    
    const errorMessage = 'Registration error';
    jest.spyOn(User, 'create').mockRejectedValue(new Error(errorMessage));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
  });

  describe('User Controller Tests', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      // Mock bcrypt
      bcrypt.compare.mockResolvedValue(true);

      // Mock User model
      const userMock = {
        id: 'fakeUserId',
        username: 'testuser',
        password: 'hashedPassword',
      };
      jest.spyOn(User, 'getOneByUsername').mockResolvedValue(userMock);

      // Mock Token model
      const tokenMock = {
        token: 'fakeToken',
      };
      jest.spyOn(Token, 'create').mockResolvedValue(tokenMock);
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

      await login(req, res);

      expect(User.getOneByUsername).toHaveBeenCalledWith('testuser');
      expect(bcrypt.compare).toHaveBeenCalledWith('testpassword', 'hashedPassword');
      expect(Token.create).toHaveBeenCalledWith('fakeUserId');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ authenticated: true, token: 'fakeToken' });

      bcrypt.compare.mockResolvedValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Incorrect credentials.' });

      jest.spyOn(User, 'getOneByUsername').mockRejectedValue(new Error('Some error'));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: 'Some error' });
    });
  });
  describe('User Controller Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    const userMock = {
      id: 'fakeUserId',
      username: 'testuser',
      password: 'hashedPassword',
    };
    jest.spyOn(User, 'getOneById').mockResolvedValue(userMock);

    const tokenMock = {
      user_id: 'fakeUserId',
    };
    jest.spyOn(Token, 'getOneByToken').mockResolvedValue(tokenMock);
  });

  test('should get user ID', async () => {
    const req = {
      body: {
        token: 'fakeToken',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getUserId(req, res);

    expect(Token.getOneByToken).toHaveBeenCalledWith('fakeToken');
    expect(User.getOneById).toHaveBeenCalledWith('fakeUserId');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 'fakeUserId',
      username: 'testuser',
      password: 'hashedPassword',
    });
  });

  test('should handle error during user ID retrieval', async () => {
    const req = {
      body: {
        token: 'fakeToken',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.spyOn(Token, 'getOneByToken').mockRejectedValue(new Error('Token error'));

    await getUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token error' });
  });
});
});
