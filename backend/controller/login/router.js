const express = require('express');
const router = express.Router();
const {
	User
} = require('../../model'); // Helyes modell importálása
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Bejelentkezés
router.post('/', async (req, res) => { // Itt nincs '/login' az útvonalban
	const {
		email,
		password
	} = req.body;

	try {
		const user = await User.findOne({
			where: {
				email
			}
		});

		if (!user) {
			return res.status(400).json({
				error: [{
					msg: "Bad credentials"
				}]
			});
		}

		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			return res.status(401).json({
				error: [{
					msg: "Unauthorized user"
				}]
			});
		}

		const accessToken = jwt.sign({
				email: user.email
			},
			'AtMySignalUnleashHell', // Használj erősebb titkosítási kulcsot éles környezetben!
			{
				expiresIn: '1h'
			}
		);

		res.json({
			success: true,
			accessToken,
			user: {
				email: user.email
			}
		});
	} catch (error) {
		console.error('Server error:', error);
		return res.status(500).json({
			error: [{
				msg: "Server error"
			}]
		});
	}
});

module.exports = router;