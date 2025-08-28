const userService = require('../../services/user.service');
const createError = require('http-errors');
const asyncHandler = require('express-async-handler');

const findAll = asyncHandler(async (req, res, next) => {
  const users = await userService.getAllUsers(req.query);
  res.json(users);
});

const findOne = asyncHandler(async (req, res, next) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    return next(new createError.NotFound("User not found"));
  }
  res.json(user);
});

const create = asyncHandler(async (req, res, next) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});

const update = asyncHandler(async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    if (err.message === 'Not found') {
      return next(new createError.NotFound("User not found"));
    }
    next(err);
  }
});

const deleteOne = asyncHandler(async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) {
    if (err.message === 'Not found') {
      return next(new createError.NotFound("User not found"));
    }
    next(err);
  }
});

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteOne,
};
