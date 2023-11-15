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
   

  
   test('should get a user by username', async () => {
    const username = 'testuser';

    // Mock the database query response for getOneByUsername
    const mockRows = [{ user_id: 1, username, password: 'hashedPassword' }];
    db.query.mockResolvedValue({ rows: mockRows });

    const result = await User.getOneByUsername(username);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM Users WHERE username = $1', [username]);
    expect(result).toEqual(new User(mockRows[0]));
  });

  test('should throw an error when unable to find a user by username', async () => {
    const username = 'testuser';

    // Mock the database query response for getOneByUsername
    db.query.mockResolvedValue({ rows: [] });

    await expect(User.getOneByUsername(username)).rejects.toThrow('Unable to locate user.');

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM Users WHERE username = $1', [username]);
  });

  
});