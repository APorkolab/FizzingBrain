const express = require('express');
const router = express.Router();
const {
	Question
} = require('../../model'); // Helyes modell importálása
const authenticateJwt = require('../../model/auth/authenticate');
const controller = require('../base/controller')(Question);

// Create
router.post('/', authenticateJwt, controller.create);

// Read
router.get('/rand', controller.findRandom);
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);

// Update
router.put('/:id', authenticateJwt, controller.replace);
router.patch('/:id', authenticateJwt, controller.update);

// Delete 
router.delete('/:id', authenticateJwt, controller.delete);

module.exports = router;