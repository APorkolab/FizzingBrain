const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger/logger');
require("dotenv").config();

const app = express();

// Cross Origin Resource Sharing
app.use(cors());

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));
app.use(bodyParser.json());

const authenticateJwt = require('./model/auth/authenticate');

// Define routes
app.use('/question', require('./controller/question/router'));
app.use('/user', authenticateJwt, require('./controller/user/router'));
app.use('/login', require('./controller/login/router'));

app.use('/', (req, res, next) => {
	console.log(req.url);
	res.send('The Fizzingbrain v.1.0.0 backend is working!');
});

app.use((err, req, res, next) => {
	res.status(500);
	res.json({
		hasError: true,
		message: err.message,
	});
});

module.exports = app;