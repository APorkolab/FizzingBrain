require('dotenv').config();
const logger = require('./logger/logger');
const app = require('./server');
const sequelize = require('./config/database');
const port = process.env.PORT || 3000;
const seedDatabase = require('./seed/seeder');

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
	logger.error('No database config found.');
	process.exit();
}

sequelize.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
		return sequelize.sync();
	})
	.then(() => {
		return seedDatabase(); // Hívd meg a seeder függvényt
	})
	.then(() => {
		logger.info('Data has been seeded into the database.');
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch(err => {
		logger.error('Unable to connect to the database:', err);
		process.exit();
	});