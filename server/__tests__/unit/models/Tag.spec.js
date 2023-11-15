const db = require('../../../database/connect');
const Tag = require('../../../models/Tag');

jest.mock('../../../database/connect');

describe('Tag Model Tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('getAllTags function', () => {
        test('should return an array of Tag instances', async () => {
            const mockRows = [{ tag_id: 1, tag: 'Tag 1' }];
            db.query.mockResolvedValue({ rows: mockRows });

            const result = await Tag.getAllTags();

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM tags;');
            expect(result).toEqual([new Tag(mockRows[0])]);
        });

        test('should throw an error when no tags are available', async () => {
            db.query.mockResolvedValue({ rows: [] });

            await expect(Tag.getAllTags()).rejects.toThrow('No tags available.');

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM tags;');
        });
    });

    describe('getOneById function', () => {
        test('should return a single Tag instance for a given tag_id', async () => {
            const tagId = 1;

            const mockRow = { tag_id: tagId, tag: 'Tag 1' };
            db.query.mockResolvedValue({ rows: [mockRow] });

            const result = await Tag.getOneById(tagId);

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM tags WHERE tag_id = $1;', [tagId]);
            expect(result).toEqual(new Tag(mockRow));
        });

        test('should throw an error when no tag is available for a given tag_id', async () => {
            const tagId = 1;

            db.query.mockResolvedValue({ rows: [] });

            await expect(Tag.getOneById(tagId)).rejects.toThrow('Unable to locate tag by id.');

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM tags WHERE tag_id = $1;', [tagId]);
        });
    });

    describe('getOneByName function', () => {
        test('should return a single Tag instance for a given tag name', async () => {
            const tagName = 'Tag 1';

            const mockRow = { tag_id: 1, tag: tagName };
            db.query.mockResolvedValue({ rows: [mockRow] });

            const result = await Tag.getOneByName(tagName);

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM tags WHERE tag = $1;', [tagName]);
            expect(result).toEqual(new Tag(mockRow));
        });

        test('should throw an error when no tag is available for a given tag name', async () => {
            const tagName = 'Tag 1';

            db.query.mockResolvedValue({ rows: [] });

            await expect(Tag.getOneByName(tagName)).rejects.toThrow('Unable to locate tag by name.');

            expect(db.query).toHaveBeenCalledWith('SELECT * FROM tags WHERE tag = $1;', [tagName]);
        });
    });
});
