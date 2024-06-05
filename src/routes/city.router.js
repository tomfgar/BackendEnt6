const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const { getAll, create, getOne, update, remove } = require('../controllers/city.controller');

const cityRouter = express.Router();

cityRouter.route('/cities')
    .get(getAll)
    .post(create);

cityRouter.route('/cities/:id')
    .get(getOne)
    .put(update)
    .delete(remove);

module.exports = cityRouter;
