const {
    Sequelize,
    DataTypes
} = require('sequelize');
const config = require('config');

const sequelize = new Sequelize(config.get('database.database'), config.get('database.username'), config.get('database.password'), {
    host: config.get('database.host'),
    dialect: config.get('database.dialect'),
    logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Place = require('./place')(sequelize, DataTypes);
db.Player = require('./player')(sequelize, DataTypes);
db.AllPlace = require('./allplace')(sequelize, DataTypes);

module.exports = db;