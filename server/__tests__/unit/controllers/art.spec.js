const {
  index,
  show,
  create,
  comments,
  update,
  destroy,
} = require('../../../controllers/art');
const Art = require('../../../models/Art')

jest.mock('../../../models/Art');

describe('Art Controller Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('show function should return a single art', async () => {
    const artMock = { id: 1, title: 'Art 1' };
    
    Art.getOneById.mockResolvedValue(artMock);

    const req = {
      params: { id: 1 },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await show(req, res);

    
    expect(Art.getOneById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(artMock);
  });

  test('create function should create a new art', async () => {
    const artData = { title: 'New Art', description: 'Description' };
    
    const newArtMock = { id: 3, title: 'New Art', description: 'Description' };
    
    Art.create.mockResolvedValue(newArtMock);

    const req = {
      body: artData,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await create(req, res);

    
    expect(Art.create).toHaveBeenCalledWith(artData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(newArtMock);
  });

  test('comments function should return comments for a specific art', async () => {
    const commentsMock = [
      { id: 1, text: 'Comment 1' },
      { id: 2, text: 'Comment 2' },
    ];

    Art.getCommentsById.mockResolvedValue(commentsMock);

    const req = {
      params: { id: 1 },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await comments(req, res);

    expect(Art.getCommentsById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(commentsMock);
  });

  test('update function should update an existing art', async () => {
  const artData = { title: 'Updated Art', description: 'Updated Description' };

  const updatedArtMock = { id: 1, title: 'Updated Art', description: 'Updated Description' };

  const artInstanceMock = {
    update: jest.fn().mockResolvedValue(updatedArtMock),
  };

  Art.getOneById.mockResolvedValue(artInstanceMock);

  const req = {
    params: { id: 1 },
    body: artData,
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await update(req, res);

  expect(Art.getOneById).toHaveBeenCalledWith(1);
  expect(artInstanceMock.update).toHaveBeenCalledWith(artData);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(updatedArtMock);
});



test('destroy function should delete an existing art', async () => {
  const artInstanceMock = {
    destroy: jest.fn().mockResolvedValue(),
  };

  Art.getOneById.mockResolvedValue(artInstanceMock);

  const req = {
    params: { id: 1 },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await destroy(req, res);

  expect(Art.getOneById).toHaveBeenCalledWith(1);
  expect(artInstanceMock.destroy).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(204);
  expect(res.json).toHaveBeenCalledWith({ message: 'Art deleted successfully.' });
});

});