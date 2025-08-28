const { User } = require('../model');
const { Op } = require('sequelize');

const findAll = async (params = {}) => {
  const searchParams = { ...params };
  if (Object.keys(searchParams).length) {
    Object.keys(searchParams).forEach(key => {
      searchParams[key] = {
        [Op.like]: `%${searchParams[key]}%`
      };
    });
  }
  return User.findAll({ where: searchParams });
};

const findById = (id) => User.findByPk(id);

const create = (userData) => User.create(userData);

const update = async (id, updateData) => {
  const [updatedRows] = await User.update(updateData, { where: { id } });
  if (updatedRows === 0) {
    throw new Error('Not found');
  }
  return findById(id); // Return the updated user
};

const deleteById = async (id) => {
  const result = await User.destroy({ where: { id } });
  if (!result) {
    throw new Error('Not found');
  }
  return result;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
