const userRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  if (!password) return null;
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const getAllUsers = (params) => {
  return userRepository.findAll(params);
};

const getUserById = (id) => {
  return userRepository.findById(id);
};

const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  const dataToSave = { ...userData, password: hashedPassword };
  return userRepository.create(dataToSave);
};

const updateUser = async (id, userData) => {
  let dataToSave = { ...userData };
  if (userData.password) {
    dataToSave.password = await hashPassword(userData.password);
  } else {
    // Ensure we don't wipe out the password if it's not provided
    delete dataToSave.password;
  }
  return userRepository.update(id, dataToSave);
};

const deleteUser = (id) => {
  return userRepository.deleteById(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
