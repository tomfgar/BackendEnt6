const request = require('supertest');
const app = require('../app');

describe('Hotel API Endpoints', () => {
    let hotelId;
    let token;

    beforeAll(async () => {
        const credentials = {
            email: "tomy@gmail.com",
            password: "tomy26996",
        }
        const res = await request(app).post('/users/login').send(credentials);
        token = res.body.token;
    });

    test('POST /hotels debe crear un hotel', async () => {
        const newHotel = {
            name: 'Hotel Example',
            location: 'City Example',
        };

        const response = await request(app)
            .post('/hotels')
            .send(newHotel)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        hotelId = response.body.id;
    });

    test('GET /hotels debe traer todos los hoteles', async () => {
        const response = await request(app)
            .get('/hotels')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('GET /hotels/:id debe traer un hotel específico', async () => {
        const response = await request(app)
            .get(`/hotels/${hotelId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(hotelId);
    });

    test('PUT /hotels/:id debe actualizar un hotel', async () => {
        const updatedHotel = {
            name: 'Hotel Updated',
            location: 'New City',
        };

        const response = await request(app)
            .put(`/hotels/${hotelId}`)
            .send(updatedHotel)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    test('DELETE /hotels/:id debe eliminar un hotel', async () => {
        const response = await request(app)
            .delete(`/hotels/${hotelId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
    });
});
