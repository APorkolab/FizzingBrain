const bcrypt = require('bcrypt');
const Sequelize = require("sequelize");
const db = require("../config/database");
var userSchema = db.define("user", {
	id: {
		// field: 'user_id',
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	password: {
		// field: 'user_password',
		type: Sequelize.STRING,
		allowNull: true
	},
	firstName: {
		// field: 'user_firstname',
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		// field: 'user_lastname',
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		// field: 'user_email',
		allowNull: false
	},
}, {
	// freeze name table not using *s on name
	freezeTableName: true,
	// dont use createdAt/update
	timestamps: false,
	hooks: {
		beforeCreate: async (user) => {
			if (user.password) {
				const salt = await bcrypt.genSaltSync(10, 'a');
				user.password = bcrypt.hashSync(user.password, salt);
			}
		},
		beforeUpdate: async (user) => {
			if (user.password) {
				const salt = await bcrypt.genSaltSync(10, 'a');
				user.password = bcrypt.hashSync(user.password, salt);
			}
		}
	},
	instanceMethods: {
		validPassword: (password) => {
			return bcrypt.compareSync(password, this.password);
		}
	}
});
userSchema.prototype.validPassword = async (password, hash) => {
	return await bcrypt.compareSync(password, hash);
}
module.exports = userSchema;
return userSchema;