const fsp = require('fs').promises;
const path = require('path');
const db = require('../model/index');
const User = db.User;
const Question = db.Question;

const sqlUploader = async (model, fileName) => {
	try {
		const filePath = path.resolve(__dirname, `../seed/${fileName}.json`);
		const source = await fsp.readFile(filePath, 'utf8');

		if (!source) {
			console.error(`File ${fileName}.json is empty or missing`);
			return;
		}

		const list = JSON.parse(source);

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
		await db.sequelize.authenticate();
		console.log('Connection has been established successfully.');

		await db.sequelize.sync({
			force: false
		});
		console.log('All tables have been created.');

		await sqlUploader(Question, 'question');
		await sqlUploader(User, 'user');

		console.log("Every file has been processed by the seeder!");
	} catch (error) {
		console.error('Unable to connect to the database or seed data:', error.message);
		throw error;
	} finally {
		if (process.env.NODE_ENV !== 'development') {
			await db.sequelize.close();
			console.log('Database connection closed.');
		}
	}
};

module.exports = seedDatabase;