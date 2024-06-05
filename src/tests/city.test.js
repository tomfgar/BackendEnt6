const request = require('supertest');
const app = require('../app');

describe('City API Endpoints', () => {
    let cityId;
    let token;

    beforeAll(async () => {
        const credentials = {
            email: "tomy@gmail.com",
            password: "tomy26996",
        }
        const res = await request(app).post('/users/login').send(credentials);
        token = res.body.token;
    });

    test('POST /cities debe crear una ciudad', async () => {
        const newCity = {
            name: 'City Example',
            location: 'City Example',
        };

        const response = await request(app)
            .post('/cities')
            .send(newCity)
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        cityId = response.body.id;
    });

    test('GET /cities debe traer todas las ciudades', async () => {
        const response = await request(app)
            .get('/cities')
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('GET /cities/:id debe traer una ciudad específica', async () => {
        const response = await request(app)
            .get(`/cities/${cityId}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(cityId);
    });

    test('PUT /cities/:id debe actualizar una ciudad', async () => {
        const updatedCity = {
            name: 'City Updated',
            location: 'New City',
        };

        const response = await request(app)
            .put(`/cities/${cityId}`)
            .send(updatedCity)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
    });

    test('DELETE /cities/:id debe eliminar una ciudad', async () => {
        const response = await request(app)
            .delete(`/cities/${cityId}`)
            .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(204);
    });
});
