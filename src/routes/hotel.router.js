const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const { getAll, create, getOne, update, remove } = require('../controllers/hotel.controller');

const hotelRouter = express.Router();

hotelRouter.route('/hotels')
    .get(getAll)
    .post(create);

hotelRouter.route('/hotels/:id')
    .get(getOne)
    .put(update)
    .delete(remove);

module.exports = hotelRouter;
