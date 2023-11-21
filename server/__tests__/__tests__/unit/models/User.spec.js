const User = require('../../../models/User')
const db = require('../../../database/connect');

jest.mock('../../../database/connect');

describe('User Model Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create a new user', async () => {
    
    const userData = {
      username: 'testuser',
      password: 'testpassword',
    };

    
    const responseMock = {
      rows: [
        {
          user_id: 'fakeUserId',
          username: 'testuser',
          password: 'hashedPassword',
        },
      ],
    };

    
    db.query.mockResolvedValue(responseMock);

    
    const getOneByIdMock = jest.spyOn(User, 'getOneById').mockResolvedValue({
      id: 'fakeUserId',
      username: 'testuser',
      password: 'hashedPassword',
    });

    
    const newUser = await User.create(userData);

    
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

    
    const mockRows = [{ user_id: 1, username, password: 'hashedPassword' }];
    db.query.mockResolvedValue({ rows: mockRows });

    const result = await User.getOneByUsername(username);

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM Users WHERE username = $1', [username]);
    expect(result).toEqual(new User(mockRows[0]));
  });

  test('should throw an error when unable to find a user by username', async () => {
    const username = 'testuser';

    
    db.query.mockResolvedValue({ rows: [] });

    await expect(User.getOneByUsername(username)).rejects.toThrow('Unable to locate user.');

    expect(db.query).toHaveBeenCalledWith('SELECT * FROM Users WHERE username = $1', [username]);
  });

  
});