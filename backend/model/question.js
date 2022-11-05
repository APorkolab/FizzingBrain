const sequelize = require("sequelize");
const db = require("../config/database");


const question = db.define(
	"question", {
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		hungarianQuestion: {
			type: sequelize.STRING,
			allowNull: false
		},
		englishQuestion: {
			type: sequelize.STRING,
			allowNull: false
		},
		hungarianAnswer: {
			type: sequelize.STRING,
			allowNull: false
		},
		englishAnswer: {
			type: sequelize.STRING,
			allowNull: false
		},
		descriptionHungarian: {
			type: sequelize.STRING,
		},
		descriptionEnglish: {
			type: sequelize.STRING,
		}
	}, {
		// freeze name table not using *s on name
		freezeTableName: true,
		// dont use createdAt/update
		timestamps: false,
	}
);

module.exports = question;
// module.exports = sql.models.question;