const express = require('express');
const router = express.Router();
const User = require('../../model/user');
const jwt = require('jsonwebtoken');

//Post
router.post('/', async (req, res, next) => {
	const {
		email,
		password
	} = req.body;

	const fMember = await User.findOne({
		email
	});

	if (!fMember) {
		res.sendStatus(404);
		return res.json({
			error: 'This user does not exist'
		});
	}

	// User.verifyPassword(password, (err, isMatch) => {
	// 	if (err) {
	// 		return res.sendStatus(403);
	// 	}
	// 	if (!isMatch) {
	// 		throw new Error('Incorrect credentials!');
	// 	}



	// 	const accessToken = jwt.sign({
	// 			email: User.email,
	// 			role: User.role,
	// 		}, 'AllWorkAndNoPlayMakesJackADullBoy'),
	// 		{
	// 			expiresIn: '1h',
	// 		};


	// 	res.json({
	// 		success: true,
	// 		accessToken,
	// 		User
	// 	});


	// });
	// return controller.findAll(req, res, next);

	const valid = fMember.verifyPasswordSync(password);
	if (valid) {
		const accessToken = jwt.sign(
			// _id: fMember._id,
			// email: fMember.email,
			// role: fMember.role,
			{
				email: fMember.email,
				role: fMember.role
			}, 'AtMySignalUnleashHell', {
				expiresIn: '1h',
			});

		res.json({
			// success: true,
			accessToken,
			User: {
				...fMember._doc,
				password: ''
			},
		});
	} else {
		return res.sendStatus(401);
	}
});

module.exports = router;