const catchError = require('../utils/catchError');
const City = require('../models/City');

const getAll = catchError(async (req, res) => {
    const cities = await City.findAll();
    return res.json(cities);
});

const create = catchError(async (req, res) => {
    const newCity = await City.create(req.body);
    return res.status(201).json(newCity);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const city = await City.findByPk(id);
    if (!city) return res.sendStatus(404);
    return res.json(city);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await City.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const results = await City.update(req.body, {
        where: { id },
        returning: true,
    });
    if (results[0] === 0) return res.sendStatus(404);
    return res.json(results[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};
