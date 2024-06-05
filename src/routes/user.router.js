const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const userRouter = express.Router();

userRouter.route('/users')
    .get(getAll)
    .post(create);

userRouter.route('/users/login')
    .post(login)

userRouter.route('/users/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = userRouter;