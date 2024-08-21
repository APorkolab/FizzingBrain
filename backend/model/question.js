const {
	DataTypes
} = require('sequelize');
const db = require('../model/index');

const Question = db.sequelize.define('question', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false
	},
	hungarianQuestion: {
		type: DataTypes.STRING,
		allowNull: false
	},
	englishQuestion: {
		type: DataTypes.STRING,
		allowNull: false
	},
	hungarianAnswer: {
		type: DataTypes.STRING,
		allowNull: false
	},
	englishAnswer: {
		type: DataTypes.STRING,
		allowNull: false
	},
	descriptionHungarian: {
		type: DataTypes.STRING,
	},
	descriptionEnglish: {
		type: DataTypes.STRING,
	}
}, {
	freezeTableName: true,
	timestamps: false
});

module.exports = Question;