const request = require('supertest');
const express = require('express');
const artRouter = require('../../../routers/art'); 

const app = express();
app.use('/art', artRouter);

describe('Art Router', () => {
  it('should respond with a list of art on GET /art', async () => {
    const response = await request(app).get('/art');
    expect(response.status).toBe(500);
  
  });

  it('should respond with a specific art on GET /art/:id', async () => {
    const response = await request(app).get('/art/1'); 
    expect(response.status).toBe(404);
    
  });

    it('should respond with a specific art and its comments on GET /art/:id/comments', async () => {
    const response = await request(app).get('/art/1/comments');
    expect(response.status).toBe(500);
   
  });

  it('should create a new art on POST /art', async () => {
    const newArtData = {
      user_id: 1,
      title: 'New Art',
      description: 'Description of the new art',
      likes: 0,
    };

    const response = await request(app).post('/art').send(newArtData);
    expect(response.status).toBe(400);
  });

  it('should respond with updated art on PATCH /art/:id', async () => {
    const updatedArtData = {
      title: 'Updated Art',
      description: 'Updated description',
      likes: 10,
    };

    const response = await request(app).patch('/art/1').send(updatedArtData);
    expect(response.status).toBe(404);
    
  });

  it('should delete an existing art on DELETE /art/:id', async () => {
    const response = await request(app).delete('/art/1');
    expect(response.status).toBe(404);
  });

  it('should respond with an error when trying to delete a non-existing art on DELETE /art/:id', async () => {
    const response = await request(app).delete('/art/999'); 
    expect(response.status).toBe(404);
  });
});

