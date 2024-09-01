const express = require('express');
const router = express.Router();
const {
	Question
} = require('../../model'); // Helyes modell importálása

const controller = require('../base/controller')(Question);

// Create
router.post('/', (req, res, next) => {
	return controller.create(req, res, next).then(data => res.json(data)).catch(next);
});

// Read
router.get('/rand', (req, res, next) => {
	return controller.findRandom(req, res, next).then(data => res.json(data)).catch(next);
});

router.get('/', (req, res, next) => {
	return controller.findAll(req, res, next).then(data => res.json(data)).catch(next);
});

router.get('/:id', (req, res, next) => {
	return controller.findOne(req, res, next).then(data => res.json(data)).catch(next);
});

// Update
router.put('/:id', (req, res, next) => {
	return controller.update(req, res, next).then(data => res.json(data)).catch(next);
});

router.patch('/:id', (req, res, next) => {
	return controller.update(req, res, next).then(data => res.json(data)).catch(next);
});

// Delete 
router.delete('/:id', (req, res, next) => {
	return controller.delete(req, res, next).then(() => res.json({ success: true })).catch(next);
});

module.exports = router;