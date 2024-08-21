const {
	Sequelize
} = require('sequelize');
const fsp = require('fs').promises;
const path = require('path');
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
		port: process.env.DB_PORT || 3306,
		logging: process.env.NODE_ENV === 'development' ? console.log : false // Log only in development
	}
);

const runSqlScript = async (filePath) => {
	try {
		let sql = await fsp.readFile(filePath, 'utf8');

		// Remove problematic lines from the SQL script
		sql = sql
			.replace(/\/\*![^*]*\*\//g, '') // Remove MySQL specific comments
			.replace(/START TRANSACTION;/g, '') // Remove START TRANSACTION
			.replace(/COMMIT;/g, '') // Remove COMMIT
			.replace(/SET [^;]+;/g, ''); // Remove all SET commands

		// Split the SQL script into individual commands and execute each
		const commands = sql.split(';').filter(cmd => cmd.trim() !== '');
		for (const command of commands) {
			await sequelize.query(command);
		}

		console.log('SQL script executed successfully.');
	} catch (error) {
		console.error('Error executing SQL script:', error.message);
		throw error;
	}
};

const sqlUploader = async (model, fileName) => {
	try {
		const filePath = path.resolve(__dirname, `../seed/${fileName}.json`);
		const source = await fsp.readFile(filePath, 'utf8');

		if (!source) {
			console.error(`File ${fileName}.json is empty or missing`);
			return;
		}

		const list = JSON.parse(source);

		// Batch size for bulkCreate, useful for large datasets
		const batchSize = 1000;
		for (let i = 0; i < list.length; i += batchSize) {
			const batch = list.slice(i, i + batchSize);
			await model.bulkCreate(batch, {
				individualHooks: true
			});
		}

		console.log(`${model.name} records have been recreated.`);
	} catch (error) {
		console.error(`Error processing ${model.name}:`, error.message);
	}
};

const seedDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');

		// Run the SQL script to create the tables
		const scriptPath = path.resolve(__dirname, '../SQL database scripts/fkbpanik_fizzingbrain_onlyStructure.sql');
		await runSqlScript(scriptPath);

		// Optionally, synchronize the Sequelize models with the database
		if (process.env.NODE_ENV === 'development') {
			await sequelize.sync({
				force: true
			}); // Only force sync in development mode
		} else {
			await sequelize.sync(); // In production, avoid force syncing
		}

		// Run the seeder for each model
		await sqlUploader(Question, 'question');
		await sqlUploader(User, 'user');

		console.log("Every file has been processed by the seeder!");
	} catch (error) {
		console.error('Unable to connect to the database or seed data:', error.message);
		throw error;
	} finally {
		// Optional: Check environment before closing the connection
		if (process.env.NODE_ENV !== 'development') {
			await sequelize.close(); // In production, ensure the connection is properly closed
			console.log('Database connection closed.');
		}
	}
};

module.exports = seedDatabase;