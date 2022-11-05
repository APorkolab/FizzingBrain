const {
	Sequelize,
	DataTypes,
	QueryInterface
} = require('sequelize');
const sql = require('sequelize');
const fsp = require('fs').promises;
const user = require('../model/user');
const question = require('../model/question');
const {
	once
} = require('events');



// // mongoose.connection.dropDatabase();


const sqlUploader = async (model, fileName) => {

	try {
		const exists = await model.find().count();
		if (!exists) {
			throw new Error();
		}
	} catch (e) {
		const source = await fsp.readFile(
			`./seed/${fileName}.json`,
			'utf8'
		);
		const list = Array.from(JSON.parse(source));
		if (model && model.create) {
			await list.map(item => model.create(item));
			await QueryInterface.bulkInsert(fileName, list);
		}
	}
	sql.close();
};

(async () => {
	try {
		// Please run the seeder line by line, but run every line once!

		// await sqlUploader(question, 'question');
		// await sqlUploader(user, 'user');
		console.log("Every file has been processed by the seeder!");
	} catch (error) {
		console.error(error);
	}
})();