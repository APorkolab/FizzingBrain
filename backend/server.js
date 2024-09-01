const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger/logger');

const app = express();

// Cross Origin Resource Sharing
app.use(cors());

// Morgan middleware - log kérések a logger segítségével
app.use(morgan('combined', {
	stream: {
		write: message => logger.info(message.trim())
	}
}));

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

// Root route
app.use('/', (req, res, next) => {
	logger.info(`Request to ${req.url}`);
	res.send('Üdvözöljük a Fizzingbrain v.1.0.0 backend oldalon!');
});

// Error handling
app.use((err, req, res, next) => {
	logger.error(`Error: ${err.message}`);
	res.status(500).json({
		hasError: true,
		message: err.message,
	});
});

module.exports = app;