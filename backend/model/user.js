const sequelize = require("sequelize");
const db = require("../config/database");
const useBcrypt = require('sequelize-bcrypt');

const user = db.define(
	"user", {
		id: {
			type: sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		firstName: {
			type: sequelize.STRING,
			allowNull: false
		},
		lastName: {
			type: sequelize.STRING,
			allowNull: false
		},
		email: {
			type: sequelize.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: sequelize.STRING,
			allowNull: false,
		}
	}, {
		// freeze name table not using *s on name
		freezeTableName: true,
		// dont use createdAt/update
		timestamps: false,
	}
);

useBcrypt(user, {
	rounds: 12, // used to generate bcrypt salt, default: 12
	compare: 'authenticate', // method used to compare secrets, default: 'authenticate'
});

// module.exports = sql.models.User;
module.exports = user;