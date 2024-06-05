const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Booking = sequelize.define('Booking', {
    checkInDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    checkOutDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

module.exports = Booking;
