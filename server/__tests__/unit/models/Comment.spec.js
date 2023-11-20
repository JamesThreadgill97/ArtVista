const db = require('../../../database/connect');
const Comment = require('../../../models/Comment');

jest.mock('../../../database/connect');

describe('Comment Model Tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('getOneById function', () => {
        test('should return a single Comment instance for a given comment_id', async () => {
            const commentId = 1;

            const mockRow = { comment_id: commentId, user_id: 1, art_id: 1, content: 'Comment 1' };
            db.query.mockResolvedValue({ rows: [mockRow] });

            const result = await Comment.getOneById(commentId);

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM comments WHERE comment_id = $1;', [commentId]);
            expect(result).toEqual(new Comment(mockRow));
        });

        test('should throw an error when no comment is available for a given comment_id', async () => {
            const commentId = 1;

            db.query.mockResolvedValue({ rows: [] });

            await expect(Comment.getOneById(commentId)).rejects.toThrow('Unable to find comment.');

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM comments WHERE comment_id = $1;', [commentId]);
        });
    });

    describe('create function', () => {
        test('should create a new Comment instance', async () => {
            const mockData = {
                user_id: 1,
                art_id: 1,
                content: 'New Comment'
            };

            const mockRow = { comment_id: 1, user_id: 1, art_id: 1, content: 'New Comment' };
            db.query.mockResolvedValue({ rows: [mockRow] });

            const result = await Comment.create(mockData);

            expect(db.query).toHaveBeenCalledWith(
                'INSERT INTO comments (user_id, art_id, content) VALUES ($1, $2, $3) RETURNING *;',
                [1, 1, 'New Comment']
            );
            expect(result).toEqual(new Comment(mockRow));
        });
    });

    describe('destroy function', () => {
        test('should delete an existing Comment instance', async () => {
            const commentId = 1;

            const mockRow = { comment_id: commentId, user_id: 1, art_id: 1, content: 'Comment 1' };
            db.query.mockResolvedValue({ rows: [mockRow] });

            const commentInstance = new Comment(mockRow);

            const result = await commentInstance.destroy();

            expect(db.query).toHaveBeenCalledWith('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [commentId]);
            expect(result).toEqual(new Comment(mockRow));
        });

        test('should throw an error when unable to delete a comment instance', async () => {
            const commentId = 1;

            db.query.mockResolvedValue({ rows: [] });

            const commentInstance = new Comment({ comment_id: commentId, user_id: 1, art_id: 1, content: 'Comment 1' });

            await expect(commentInstance.destroy()).rejects.toThrow('Unable to delete comment from table.');

            expect(db.query).toHaveBeenCalledWith('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [commentId]);
        });
    });
});
