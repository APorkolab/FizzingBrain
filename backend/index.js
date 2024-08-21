require('dotenv').config();
const logger = require('./logger/logger');
const app = require('./server');
const db = require('./model/index');
const port = process.env.PORT || 3000;
const seedDatabase = require('./seed/seeder');

// Ellenőrizzük, hogy az összes szükséges adatbázis környezeti változó megvan-e
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
	logger.error('No database config found.');
	process.exit(1);
}

// Adatbázis kapcsolat létrehozása és alkalmazás indítása
db.sequelize.authenticate()
	.then(() => {
		logger.info('Connection has been established successfully.');
		return db.sequelize.sync();
	})
	.then(() => {
		return seedDatabase(); // Meghívjuk a seeder függvényt
	})
	.then(() => {
		logger.info('Data has been seeded into the database.');
		app.listen(port, () => {
			logger.info(`Server is running on port ${port}`);
		});
	})
	.catch(err => {
		logger.error('Unable to connect to the database:', err.message);
		process.exit(1);
	});