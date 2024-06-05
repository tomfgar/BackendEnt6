const request = require('supertest');
const app = require('../app');

describe('Booking API Endpoints', () => {
    let bookingId;
    let userId;
    let token;

    beforeAll(async () => {
        const credentials = {
            email: "tomy@gmail.com",
            password: "tomy26996",
        }
        const res = await request(app).post('/users/login').send(credentials);
        token = res.body.token;
        userId = res.body.user.id;
    });

    test('POST /bookings debe crear una reserva', async () => {
        const newBooking = {
            userId: userId,
            hotelId: 1, 
            checkInDate: '2024-06-15',
            checkOutDate: '2024-06-20',
        };

        const response = await request(app)
            .post('/bookings')
            .set('Authorization', `Bearer ${token}`)
            .send(newBooking);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        bookingId = response.body.id;
    });

    test('GET /bookings debe traer todas las reservas de un usuario', async () => {
        const response = await request(app)
            .get('/bookings')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach(booking => {
            expect(booking.userId).toBe(userId);
        });
    });

    test('GET /bookings/:id debe traer una reserva específica por ID', async () => {
        const response = await request(app)
            .get(`/bookings/${bookingId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(bookingId);
        expect(response.body.userId).toBe(userId);
    });

    test('PUT /bookings/:id debe actualizar una reserva', async () => {
        const updatedBookingData = {
            checkInDate: '2024-06-16',
            checkOutDate: '2024-06-21',
        };

        const response = await request(app)
            .put(`/bookings/${bookingId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedBookingData);

        expect(response.status).toBe(200);
    });

    test('DELETE /bookings/:id debe eliminar una reserva', async () => {
        const response = await request(app)
            .delete(`/bookings/${bookingId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(204);
    });
});
