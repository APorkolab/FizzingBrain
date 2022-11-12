const express = require('express');
const router = express.Router();
const User = require('../../model/user');
const jwt = require('jsonwebtoken');
const useBcrypt = require('sequelize-bcrypt');
const {
	JSON
} = require('sequelize');

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
		return res.status(400).send({
			error: [{
				msg: "Bad credentials"
			}]
		});
	}

	// const valid = user.authenticate(password);
	const valid = authenticateUserWithemail(user);
	if (valid) {
		const accessToken = jwt.sign({
			email: user.email,
		}, 'AtMySignalUnleashHell', {
			expiresIn: '1h',
		});

		res.json({
			success: true,
			accessToken,
			User: {
				email: user.email,
				password: ''
			},
		});
	} else {
		return res.status(401).send({
			error: [{
				msg: "Unauthorized user"
			}]
		});
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
			return res.status(400).send({
				error: [{
					msg: error
				}]
			});
		}
	})
}

module.exports = router;