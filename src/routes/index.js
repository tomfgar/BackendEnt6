const express = require('express');
const userRouter = require('./user.router');
const reviewRouter = require('./review.router');
const imageRouter = require('./image.router');
const hotelRouter = require('./hotel.router');
const cityRouter = require('./city.router');
const bookingRouter = require('./booking.router');

const router = express.Router();

// colocar las rutas aquí
router.use('/users', userRouter);
router.use('/reviews', reviewRouter);
router.use('/images', imageRouter);
router.use('/hotels', hotelRouter);
router.use('/cities', cityRouter);
router.use('/bookings', bookingRouter);


module.exports = router;