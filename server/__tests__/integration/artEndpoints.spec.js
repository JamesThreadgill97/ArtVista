const request = require('supertest')
const app = require('../../app')
const { resetTestDB } = require('./config')

describe('api server', () => {
    let api;

    beforeEach(async () => {
        await resetTestDB()
    })

    beforeAll(() => {
        api = app.listen(4000, () => {
            console.log('🌕Test server running in port 4000')
        })
    })

    afterAll((done) => {
        // console.log('Gracefully stopping the test server')
        api.close(done)
    })



    test('responds to GET / with a message and a description', async () => {
        const response = await request(api).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('This is the art API');
    });
    
    test('responds to GET /art with a 200 status code', (done) => {
        request(api).get('/art').expect(200, done)
    })
    test('GET /art display 3 elements in the web browser', async () => {
        const response = await request(api).get('/art')
        expect(response.body.length).toBe(3)
    })


    describe('Art Endpoints', () => {
        it('should get all art pieces', async () => {
            const response = await request(api).get('/art');
            expect(response.status).toBe(200);
        });

        it('should get a specific art piece by ID', async () => {
            const response = await request(api).get('/art/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                id: 1,
                user_id: 1,
                title: "monalisa",
                description: "by vinci",
                likes: 90
            });
        });
    });
});