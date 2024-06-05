const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const { getAll, create, getOne, remove } = require('../controllers/image.controller');
const upload = require('../utils/multer');


const imageRouter = express.Router();

imageRouter.route('/images')
    .get(getAll)
    .post(upload.single('image'), create);

imageRouter.route('/images/:id')    
    .get(getOne)
    .delete(remove)

module.exports = imageRouter;
