const db = require('../../../database/connect');
const Art = require('../../../models/Art');

jest.mock('../../../database/connect');

describe('Art Model Tests', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('getAll function', () => {
        test('should return an array of Art instances', async () => {
           
            const mockRows = [{ art_id: 1, user_id: 1, title: 'Art 1', description: 'Description 1', likes: 5 }];
            db.query.mockResolvedValue({ rows: mockRows });

            const result = await Art.getAll();

           
            expect(db.query).toHaveBeenCalledWith('SELECT * from art');
            expect(result).toEqual([new Art(mockRows[0])]);
        });

        test('should throw an error when no art is available', async () => {
            db.query.mockResolvedValue({ rows: [] });

            await expect(Art.getAll()).rejects.toThrow('No art available.');

            expect(db.query).toHaveBeenCalledWith('SELECT * from art');
        });
    });



    describe('getAllByUser function', () => {
        test('should return an array of Art instances for a given user_id', async () => {
            const userId = 1;

            const mockRows = [{ art_id: 1, user_id: userId, title: 'Art 1', description: 'Description 1', likes: 5 }];
            db.query.mockResolvedValue({ rows: mockRows });

            const result = await Art.getAllByUser({ user_id: userId });

            expect(db.query).toHaveBeenCalledWith('SELECT * from art WHERE user_id = $1 ;', [userId]);
            expect(result).toEqual([new Art(mockRows[0])]);
        });

        test('should throw an error when no art is available for a given user_id', async () => {
            const userId = 1;

            db.query.mockResolvedValue({ rows: [] });

            await expect(Art.getAllByUser({ user_id: userId })).rejects.toThrow('No art available.');

            expect(db.query).toHaveBeenCalledWith('SELECT * from art WHERE user_id = $1 ;', [userId]);
        });
      
        describe('getOneById function', () => {
            test('should return a single Art instance for a given art_id', async () => {
                const artId = 1;

                
                const mockRow = { art_id: artId, user_id: 1, title: 'Art 1', description: 'Description 1', likes: 5 };
                db.query.mockResolvedValue({ rows: [mockRow] });

              
                const result = await Art.getOneById(artId);

               
                expect(db.query).toHaveBeenCalledWith('SELECT * FROM art WHERE art_id = $1;', [artId]);
                expect(result).toEqual(new Art(mockRow));
            });

            test('should throw an error when no art is available for a given art_id', async () => {
                const artId = 1;

               
                db.query.mockResolvedValue({ rows: [] });

               
                await expect(Art.getOneById(artId)).rejects.toThrow('Unable to locate art.');

               
                expect(db.query).toHaveBeenCalledWith('SELECT * FROM art WHERE art_id = $1;', [artId]);
            });
        });

        describe('getCommentsById function', () => {
            test('should return an array of comments for a given art_id', async () => {
                const artId = 1;

                
                const mockRows = [{ comment_id: 1, art_id: artId, text: 'Comment 1' }];
                db.query.mockResolvedValue({ rows: mockRows });

                const result = await Art.getCommentsById(artId);

                
                expect(db.query).toHaveBeenCalledWith('SELECT * FROM comments WHERE art_id = $1;', [artId]);
                expect(result).toEqual(mockRows);
            });

            test('should return "no comments" when no comments are available for a given art_id', async () => {
                const artId = 1;

               
                db.query.mockResolvedValue({ rows: [] });

               
                const result = await Art.getCommentsById(artId);

               
                expect(db.query).toHaveBeenCalledWith('SELECT * FROM comments WHERE art_id = $1;', [artId]);
                expect(result).toEqual('no comments');
            });
        });

        describe('create function', () => {
            test('should create a new Art instance', async () => {
                
                const mockRow = { art_id: 1, user_id: 1, title: 'New Art', description: 'New Description', likes: 0 };
                db.query.mockResolvedValue({ rows: [mockRow] });

                
                const result = await Art.create({
                    user_id: 1,
                    title: 'New Art',
                    description: 'New Description',
                    likes: 0
                });

                
                expect(db.query).toHaveBeenCalledWith(
                    'INSERT INTO art (user_id, title, description, likes) VALUES ($1, $2, $3, $4) RETURNING *;',
                    [1, 'New Art', 'New Description', 0]
                );
                expect(result).toEqual(new Art(mockRow));
            });
        });

        describe('destroy function', () => {
  test('should delete an existing Art instance', async () => {
    const artId = 1;

    
    const mockRow = { art_id: artId, user_id: 1, title: 'Art 1', description: 'Description 1', likes: 5 };
    db.query.mockResolvedValue({ rows: [mockRow] });

   
    const artInstance = new Art(mockRow);

    
    const result = await artInstance.destroy();

  
    expect(db.query).toHaveBeenCalledWith('DELETE FROM art WHERE art_id = $1 RETURNING *;', [artId]);
    expect(result).toEqual(new Art(mockRow));
      });

    test('should throw an error when unable to delete an art instance', async () => {
    const artId = 1;

    
    db.query.mockResolvedValue({ rows: [] }); 

    
    const artInstance = new Art({ art_id: artId, user_id: 1, title: 'Art 1', description: 'Description 1', likes: 5 });

   
    await expect(artInstance.destroy()).rejects.toThrow('Unable to delete art from art table.');

    
    expect(db.query).toHaveBeenCalledWith('DELETE FROM art WHERE art_id = $1 RETURNING *;', [artId]);
            });
        });
    });
});
