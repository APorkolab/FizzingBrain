const express = require('express');
const createError = require('http-errors');
const sequelizeService = require('../base/service');

module.exports = (model, populateList = []) => {
	const service = sequelizeService(model, populateList);
	return {
		findAll(req, res, next) {
			return service.findAll()
				.then(list => res.json(list))
				.catch(next);
		},
		findOne(req, res, next) {
			return service.findOne(req.params.id)
				.then(entity => {
					if (!entity) {
						return next(new createError.NotFound("Entity not found"));
					}
					return res.json(entity);
				})
				.catch(next);
		},
		findRandom(req, res, next) {
			return service.findRandom()
				.then(entity => {
					if (!entity) {
						return next(new createError.NotFound("Entity not found"));
					}
					return res.json(entity);
				})
				.catch(next);
		},
		update(req, res, next) {
			return service.update(req.params.id, req.body)
				.then(entity => res.json(entity))
				.catch(err => {
					res.status(501).json(err);
				});
		},
		create(req, res, next) {
			return service.create(req.body)
				.then(entity => res.json(entity))
				.catch(err => {
					res.status(501).json(err);
				});
		},
		delete(req, res, next) {
			return service.delete(req.params.id)
				.then(() => res.json({}))
				.catch(err => {
					if (err.message === "Not found") {
						return next(new createError.NotFound(err.message));
					}
					next(new createError.InternalServerError(err.message));
				});
		}
	}
}