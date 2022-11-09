const express = require('express');
const router = express.Router();
const questionModel = require('../../model/question');

const controller = require('../base/controller')(questionModel);


// Create
router.post('/', (req, res, next) => {
	return controller.create(req, res, next);
});

//Read
router.get('/rand', (req, res, next) => {
	return controller.findRandom(req, res, next);
});

router.get('/', (req, res, next) => {
	return controller.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
	return controller.findOne(req, res, next);
});


// Update
router.put('/:id', (req, res, next) => {
	return controller.update(req, res, next);
});

router.patch('/:id', (req, res, next) => {
	return controller.update(req, res, next);
});

// Delete 
router.delete('/:id', (req, res, next) => {
	return controller.delete(req, res, next);
});

module.exports = router;