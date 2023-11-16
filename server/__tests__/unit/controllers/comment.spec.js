const Comment = require('../../../models/Comment');
const commentController = require('../../../controllers/comment'); 


describe('Comment Controller Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('create function', () => {
    test('should create a new comment and return 201 status', async () => {
      const mockCommentData = { art_id: 1, content: 'New comment', user_id: 1 };
      jest.spyOn(Comment, 'create').mockResolvedValueOnce({ /* mocked comment */ });
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await commentController.create({ body: mockCommentData }, res);

      expect(Comment.create).toHaveBeenCalledWith(mockCommentData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ /* mocked comment */ });
    });

    test('should handle errors and return 400 status with error message', async () => {
      const errorMessage = 'Error message';
      jest.spyOn(Comment, 'create').mockRejectedValueOnce(new Error(errorMessage));
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await commentController.create({ body: { invalidData: 'data' } }, res);

      expect(Comment.create).toHaveBeenCalledWith({ invalidData: 'data' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('destroy function', () => {
    test('should delete a comment and return 204 status', async () => {
      const commentId = 1;
      const commentInstance = {
        destroy: jest.fn().mockResolvedValueOnce(),
      };
      jest.spyOn(Comment, 'getOneById').mockResolvedValueOnce(commentInstance);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await commentController.destroy({ params: { id: commentId } }, res);

      expect(Comment.getOneById).toHaveBeenCalledWith(commentId);
      expect(commentInstance.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledWith({ message: 'comment deleted successfully.' });
    });

    test('should handle errors when comment not found and return 404 status with error message', async () => {
      const commentId = 1;
      jest.spyOn(Comment, 'getOneById').mockRejectedValueOnce(new Error('Unable to find comment.'));
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await commentController.destroy({ params: { id: commentId } }, res);

      expect(Comment.getOneById).toHaveBeenCalledWith(commentId);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unable to find comment.' });
    });

    test('should handle errors during deletion and return 404 status with error message', async () => {
      const commentId = 1;
      const commentInstance = {
        destroy: jest.fn().mockRejectedValueOnce(new Error('Deletion error')),
      };
      jest.spyOn(Comment, 'getOneById').mockResolvedValueOnce(commentInstance);
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await commentController.destroy({ params: { id: commentId } }, res);

      expect(Comment.getOneById).toHaveBeenCalledWith(commentId);
      expect(commentInstance.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Deletion error' });
    });
  });
});
