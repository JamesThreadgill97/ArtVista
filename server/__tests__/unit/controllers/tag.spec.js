const Tag = require('../../../models/Tag');
const tagController = require('../../../controllers/tag'); 

describe('Tag Controller Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('index function', () => {
    test('should return tags and 200 status', async () => {
      const mockTags = [{ /* mocked tag data */ }];
      jest.spyOn(Tag, 'getAllTags').mockResolvedValueOnce(mockTags);
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await tagController.index({}, res);

      expect(Tag.getAllTags).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ data: mockTags });
    });

    test('should handle errors and return 500 status with error message', async () => {
      const errorMessage = 'Error message';
      jest.spyOn(Tag, 'getAllTags').mockRejectedValueOnce(new Error(errorMessage));
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await tagController.index({}, res);

      expect(Tag.getAllTags).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('show function', () => {
    test('should return a tag and 200 status', async () => {
      const tagId = 1;
      const mockTag = { /* mocked tag data */ };
      jest.spyOn(Tag, 'getOneById').mockResolvedValueOnce(mockTag);
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await tagController.show({ params: { id: tagId } }, res);

      expect(Tag.getOneById).toHaveBeenCalledWith(tagId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ data: mockTag });
    });

    test('should handle errors when tag not found and return 404 status with error message', async () => {
      const tagId = 1;
      jest.spyOn(Tag, 'getOneById').mockRejectedValueOnce(new Error('Unable to locate tag by id.'));
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await tagController.show({ params: { id: tagId } }, res);

      expect(Tag.getOneById).toHaveBeenCalledWith(tagId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ error: 'Unable to locate tag by id.' });
    });
  });

  describe('getByName function', () => {
    test('should return a tag and 200 status', async () => {
      const tagName = 'example';
      const mockTag = { /* mocked tag data */ };
      jest.spyOn(Tag, 'getOneByName').mockResolvedValueOnce(mockTag);
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await tagController.getByName({ params: { tag: tagName } }, res);

      expect(Tag.getOneByName).toHaveBeenCalledWith(tagName);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ data: mockTag });
    });

    test('should handle errors when tag not found and return 404 status with error message', async () => {
      const tagName = 'example';
      jest.spyOn(Tag, 'getOneByName').mockRejectedValueOnce(new Error('Unable to locate tag by name.'));
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await tagController.getByName({ params: { tag: tagName } }, res);

      expect(Tag.getOneByName).toHaveBeenCalledWith(tagName);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ error: 'Unable to locate tag by name.' });
    });
  });
});
