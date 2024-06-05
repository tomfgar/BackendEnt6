const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const { getAll, create, getOne, remove, update } = require('../controllers/review.controller');

const reviewRouter = express.Router();


reviewRouter.route('/reviews')
    .get(getAll)
    .post(create);

reviewRouter.route('/reviews/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = reviewRouter;

