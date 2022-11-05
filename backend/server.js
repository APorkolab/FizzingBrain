const express = require('express');
const morgan = require('morgan');
const httpErrors = require('http-errors');
const config = require('config');
const bodyParser = require('body-parser');
const sequelize = require("sequelize");
const cors = require('cors');
const logger = require('./logger/logger');
const user = require('./model/user');
const question = require('./model/question');
require("dotenv").config();
const app = express();


// // Create connection
// const db = mysql.createConnection({
// 	host: host,
// 	user: user,
// 	password: password,
// 	database: database
// })



// Connect


// const sql = new Sequelize(`mysql://${user}:${password}@${host}:${port}/${database}`);



const sql = new sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD, {
		dialect: "mysql",
		host: process.env.DB_HOST,
		port: process.env.PORT || 3306
	}
);

sql.authenticate().then(() => {
		console.log('Connection has been established successfully.');
	}).catch((error) => {
		console.error('Unable to connect to the database: ', error);
	})
	.then(() => {
		user.sync();
	}).then(() => {
		question.sync();
	}).then(
		require('./seed/seeder'), // Seed the database, ONLY ONCE MUST RUN
		logger.info('Data has been seeded into the database.'),
	).catch(err => logger.error(err));


// const sql = new Sequelize(database, user,
// 	password, {
// 		dialect: 'mysql',
// 		dialectOptions: {
// 			host: host,
// 			port: port
// 		},
// 	});


//Cross Origin Resource Sharing
app.use(cors());
// app.use(morgan('combined', {
// 	stream: logger.stream
// }));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));
app.use(bodyParser.json());


const authencticateJwt = require('./model/auth/authenticate');


app.use('/question', require('./controller/question/router'));
app.use('/user', authencticateJwt, require('./controller/user/router'));
// app.use('/main-actors', authencticateJwt, require('./controllers/main-actor/router'));
// app.use('/directors', authencticateJwt, require('./controllers/director/router'));
// app.use('/watched-movies', authencticateJwt, require('./controllers/watched-movie/router'));
app.use('/login', require('./controller/login/router'));

// app.use('/', (req, res, next) => {
// 	console.log(req.url);
// 	res.send('The FaMoBase v.1.0.0 backend is working!');
// });

app.use((err, req, res, next) => {
	res.status = 500;
	res.json({
		hasError: true,
		message: err.message,
	});
});

module.exports = app;