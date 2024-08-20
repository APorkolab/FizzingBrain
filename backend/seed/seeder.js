const {
	Sequelize
} = require('sequelize');
const fsp = require('fs').promises;
const User = require('../model/user');
const Question = require('../model/question');
require("dotenv").config();

// Initialize Sequelize
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD, {
		dialect: process.env.DB_DIALECT || 'mysql',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT || 3306
	}
);

const sqlUploader = async (model, fileName) => {
	try {
		const source = await fsp.readFile(`./seed/${fileName}.json`, 'utf8');
		const list = JSON.parse(source);
		if (model && model.bulkCreate) {
			await model.bulkCreate(list, {
				individualHooks: true
			});
			console.log(`${model.name} records have been recreated.`);
		}
	} catch (error) {
		console.error(`Error processing ${model.name}:`, error);
	}
};

const seedDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		// Táblák újraépítése minden indításkor
		await sequelize.sync({
			force: true
		}); // Ez törli és újraépíti az összes táblát

		// Run the seeder for each model
		await sqlUploader(Question, 'question');
		await sqlUploader(User, 'user');

		console.log("Every file has been processed by the seeder!");
	} catch (error) {
		console.error('Unable to connect to the database:', error);
		throw error;
	} finally {
		await sequelize.close();
	}
};

module.exports = seedDatabase;