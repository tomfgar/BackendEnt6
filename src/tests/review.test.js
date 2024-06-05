const app = require('../app');
const request = require('supertest');

let id;
let token;

beforeAll(async () => {
    const credentials = {
        email: "tomy@gmail.com",
        password: "tomy26996",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('GET /reviews debe traer todas las reseñas', async () => {
    const res = await request(app).get('/reviews');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /reviews debe crear una reseña', async () => {
    const newReview = {
        title: "Gran experiencia",
        content: "Disfruté mucho de mi estadía en este hotel.",
        imageDescription: "test image description",
        date: "2024-05-28",
        body: "test body",
        rating: 5,
        userId: 1, 
        hotelId: 1, 
    }
    const res = await request(app)
        .post('/reviews')
        .send(newReview)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newReview.title);
    expect(res.body.content).toBe(newReview.content);
    id = res.body.id;
});


test('DELETE /reviews/:id debe eliminar una reseña', async () => {
    const res = await request(app)
        .delete(`/reviews/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});
