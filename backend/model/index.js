require('dotenv').config();
const {
    Sequelize,
    DataTypes
} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Question = require('./question')(sequelize, DataTypes);

module.exports = db;