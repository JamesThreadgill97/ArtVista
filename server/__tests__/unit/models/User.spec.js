const User = require('../../../models/User')
const db = require('../../../database/connect');

jest.mock('../../../database/connect');

describe('User Model Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create a new user', async () => {
    // Mock data for the request
    const userData = {
      username: 'testuser',
      password: 'testpassword',
    };

    // Mock data for the response
    const responseMock = {
      rows: [
        {
          user_id: 'fakeUserId',
          username: 'testuser',
          password: 'hashedPassword',
        },
      ],
    };

    // Mock the database query method
    db.query.mockResolvedValue(responseMock);

    // Mock the getOneById method
    const getOneByIdMock = jest.spyOn(User, 'getOneById').mockResolvedValue({
      id: 'fakeUserId',
      username: 'testuser',
      password: 'hashedPassword',
    });

    // Call the create method
    const newUser = await User.create(userData);

    // Assertions
    expect(db.query).toHaveBeenCalledWith(
      'INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING user_id;',
      ['testuser', 'testpassword']
    );
    expect(getOneByIdMock).toHaveBeenCalledWith('fakeUserId');
    expect(newUser).toEqual({
      id: 'fakeUserId',
      username: 'testuser',
      password: 'hashedPassword',
    });
  });
});