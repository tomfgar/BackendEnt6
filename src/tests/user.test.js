const app = require('../app');
const request = require('supertest');

let id;
let token;

// 1. POST /users
// 2. POST /users/login
// 3. Resto de los tests

test('POST /users debe crear un usuario', async () => {
    const newUser = {
        firstName: 'Tomy',
        lastName: 'Garcia',
        email: 'tomy@gmail.com',
        password: 'tomy26996',
        gender: 'male',
    }
    const res = await request(app).post('/users').send(newUser);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newUser.firstName);
});

test('POST /users/login debe loggear al usuario', async () => {
    const credentials = {
        email: 'tomy@gmail.com',
        password: 'tomy26996',
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(credentials.email);
});

test('GET /users debe traer todos los usuarios', async () => {
    const res = await request(app).get('/users').set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /users/login con credenciales incorrectas debe dar error', async () => {
    const credentials = {
        email: 'tomyisnottesting@gmail.com',
        password: 'tomynottest1234',
    }
    const res = await request(app).post('/users/login').send(credentials);
    expect(res.status).toBe(401);
});

test('DELETE /users/:id debe eliminar un usuario', async () => {
    const res = await request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});