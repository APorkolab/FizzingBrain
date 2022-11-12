const {
	Sequelize
} = require("sequelize");
const sequelize = require("sequelize");

module.exports = (model, populateList = []) => {
	return {
		findAll: async () => {
			return model.findAll()
				.catch((error) => {
					console.error('Failed to retrieve data : ', error);
				})
		},
		findOne: async (id) => {
			return model.findOne({
					where: {
						id: id
					}
				})
				.catch((error) => {
					console.error('Failed to retrieve data : ', error);
				});
		},
		findRandom: async () => {
			return model.findAll({
				order: Sequelize.literal('rand()'),
				limit: 6
			});
		},
		// findOne: (id) => model.findByPk(id).then(() => {
		// 	console.log("Successfully find record.")
		// }).catch((error) => {
		// 	console.error('Failed to find record : ', error);
		// }),
		// findOne: (id) => model.findById(id).populate(),
		update: async (id, updateData) => model.update(updateData, {
			where: {
				id: id
			},
			individualHooks: true,
		}).then(() => {
			console.log("Successfully updated record.")
		}).catch((error) => {
			console.error('Failed to update record : ', error);
		}),
		create: async (body) => {
			try {
				const saved = await model.create(body);
				return model.findByPk(saved.id);
			} catch (error) {
				console.error(error);
			}
		},
		delete: async (id) => {
			model.destroy({
				where: {
					id: id
				}
			}).then(() => {
				console.log("Successfully deleted record.")
			}).catch((error) => {
				console.error('Failed to delete record : ', error);
			});
		}

	};
}