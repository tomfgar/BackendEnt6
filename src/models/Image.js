const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Image = sequelize.define('Image', {
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
});

module.exports = Image;
