const {
	Sequelize
} = require("sequelize");

module.exports = (model, populateList = []) => {
	return {
		findAll: async () => {
			try {
				return await model.findAll({
					include: populateList
				});
			} catch (error) {
				console.error('Failed to retrieve data:', error);
				throw error;
			}
		},
		findOne: async (id) => {
			try {
				return await model.findOne({
					where: {
						id
					},
					include: populateList
				});
			} catch (error) {
				console.error('Failed to retrieve data:', error);
				throw error;
			}
		},
		findRandom: async () => {
			try {
				return await model.findAll({
					order: Sequelize.literal('RAND()'),
					limit: 6,
					include: populateList
				});
			} catch (error) {
				console.error('Failed to retrieve data:', error);
				throw error;
			}
		},
		update: async (id, updateData) => {
			try {
				await model.update(updateData, {
					where: {
						id
					},
					individualHooks: true,
				});
				return await model.findOne({
					where: {
						id
					},
					include: populateList
				});
			} catch (error) {
				console.error('Failed to update record:', error);
				throw error;
			}
		},
		create: async (body) => {
			try {
				const saved = await model.create(body);
				return await model.findOne({
					where: {
						id: saved.id
					},
					include: populateList
				});
			} catch (error) {
				console.error('Failed to create record:', error);
				throw error;
			}
		},
		delete: async (id) => {
			try {
				const result = await model.destroy({
					where: {
						id
					}
				});
				if (!result) {
					throw new Error("Not found");
				}
			} catch (error) {
				console.error('Failed to delete record:', error);
				throw error;
			}
		}
	};
}