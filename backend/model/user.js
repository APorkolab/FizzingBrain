const {
	DataTypes
} = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../model/index');

const User = db.sequelize.define('User', {
	id: {
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	hooks: {
		beforeCreate: async (user) => {
			if (user.password) {
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(user.password, salt);
			}
		},
		beforeUpdate: async (user) => {
			if (user.password && user.changed('password')) {
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(user.password, salt);
			}
		}
	},
	freezeTableName: true,
	timestamps: false
});

User.prototype.validPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
}

module.exports = User;