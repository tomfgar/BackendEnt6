const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const { getAll, create, update, remove } = require('../controllers/booking.controller');


const bookingRouter = express.Router();

bookingRouter.route('/bookings')
    .get(getAll)
    .post(create);

bookingRouter.route('/bookings/:id')
    .put(update)
    .delete(remove);

module.exports = bookingRouter;
