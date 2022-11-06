const express = require('express');
const router = express.Router();
const User = require('../../model/user');
const jwt = require('jsonwebtoken');
const useBcrypt = require('sequelize-bcrypt');

//Post
router.post('/', async (req, res, next) => {
	const {
		email,
		password
	} = req.body;

	const user = await User.findOne({
		where: {
			email: email
		}
	});

	if (!user) {
		res.sendStatus(404);
		return res.json({
			error: 'This user does not exist'
		});
	}

	const valid = user.authenticate(password);
	if (valid) {
		const accessToken = jwt.sign({
			email: user.email,
		}, 'AtMySignalUnleashHell', {
			expiresIn: '1h',
		});

		res.json({
			// success: true,
			accessToken,
			User: {
				...user._doc,
				password: ''
			},
		});
	} else {
		return res.sendStatus(401);
	}
});

const authenticateUserWithemail = (user) => {
	return new Promise((resolve, reject) => {
		try {
			User.findOne({
				where: {
					email: user.email // user email
				}
			}).then(async (response) => {
				if (!response) {
					resolve(false);
				} else {
					if (!response.dataValues.password ||
						!await response.validPassword(user.password,
							response.dataValues.password)) {
						resolve(false);
					} else {
						resolve(response.dataValues)
					}
				}
			})
		} catch (error) {
			const response = {
				status: 500,
				data: {},
				error: {
					message: "user match failed"
				}
			};
			reject(response);
		}
	})
}

module.exports = router;