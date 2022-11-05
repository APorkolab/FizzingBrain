module.exports = (model, populateList = []) => {
	return {
		findAll: (params = {}) => {
			// 	try {
			// 		const userData = model.findAll();
			// 		if (userData.length > 0) {
			// 			res
			// 				.status(200)
			// 				.json({
			// 					message: "Connection successful",
			// 					data: userData
			// 				});
			// 		} else {
			// 			res.status(200).json({
			// 				message: "Connection failed",
			// 				data: []
			// 			});
			// 		}
			// 	} catch (error) {
			// 		res.status(404).json({
			// 			message: error
			// 		});
			// 	}
			// },
			if (Object.keys(params).length) {
				Object.keys(params).map(key => {
					params[key] = {
						$regex: '.*' + params[key] + '.*',
						$options: 'i'
					};
				});
				return model.find(params);
			}
			return model.findAll();
		},
		findOne: (id) => model.findByPk(id),
		// findOne: (id) => model.findById(id).populate(),
		update: (id, updateData) => model.update(updateData, {
			where: {
				id: id
			}
		}),
		create: async (body) => {
			const newEntity = new model(body);
			const error = newEntity.validateSync();
			if (!error) {
				const saved = await newEntity.save();
				return model.findByPk(saved._id);
			}
			throw new Error(error);
		},
		delete: async (id) => {
			const doc = await model.destroy({
				where: {
					id: id
				}
			});
			if (!doc) {
				throw new Error('Not found');
			}
			return doc.delete();
		}

	};
}