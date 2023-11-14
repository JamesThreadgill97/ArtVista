const authenticator = require('../../../middleware/authenticator');
const Token = require('../../../models/Token');

jest.mock('../../../models/Token');

describe('Authenticator Middleware Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should pass authentication with a valid token', async () => {
    const req = {
      headers: {
        authorization: 'validToken',
      },
    };

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    const next = jest.fn();

    // Mock the getOneByToken method of the Token model
    Token.getOneByToken.mockResolvedValue({
      user_id: 'fakeUserId',
    });

    await authenticator(req, res, next);

    // Assertions
    expect(Token.getOneByToken).toHaveBeenCalledWith('validToken');
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('should return a 403 error with an invalid token', async () => {
    const req = {
      headers: {
        authorization: 'invalidToken',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    // Mock the getOneByToken method of the Token model
    Token.getOneByToken.mockRejectedValue(new Error('Invalid token'));

    await authenticator(req, res, next);

    // Assertions
    expect(Token.getOneByToken).toHaveBeenCalledWith('invalidToken');
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
  });

});
