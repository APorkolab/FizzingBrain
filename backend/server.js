const express = require('express');
const httpErrors = require('http-errors');
const config = require('config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const logger = require('./logger/logger');
const mysql = require('mysql');


const {
	host,
	user,
	password,
	database
} = config.get('conn');


// Create connection
const db = mysql.createConnection({
	host: host,
	user: user,
	password: password,
	database: database
})

// Connect
db.connect((err) => {
	if (err) {
		throw err;
	}
	console.log('MySql Connected...');
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
	let sql = 'CREATE DATABASE nodemysql';
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Database created...');
	});
});

// Create table
app.get('/createpoststable', (req, res) => {
	let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
	db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Posts table created...');
	});
});

// Insert post 1
app.get('/addpost1', (req, res) => {
	let post = {
		title: 'Post One',
		body: 'This is post number one'
	};
	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post 1 added...');
	});
});

// Insert post 2
app.get('/addpost2', (req, res) => {
	let post = {
		title: 'Post Two',
		body: 'This is post number two'
	};
	let sql = 'INSERT INTO posts SET ?';
	let query = db.query(sql, post, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post 2 added...');
	});
});

// Select posts
app.get('/getposts', (req, res) => {
	let sql = 'SELECT * FROM posts';
	let query = db.query(sql, (err, results) => {
		if (err) throw err;
		console.log(results);
		res.send('Posts fetched...');
	});
});

// Select single post
app.get('/getpost/:id', (req, res) => {
	let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post fetched...');
	});
});

// Update post
app.get('/updatepost/:id', (req, res) => {
	let newTitle = 'Updated Title';
	let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post updated...');
	});
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
	let newTitle = 'Updated Title';
	let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		console.log(result);
		res.send('Post deleted...');
	});
});


//Cross Origin Resource Sharing
app.use(cors());
app.use(morgan('combined', {
	stream: logger.stream
}));
app.use(express.static('public'));
app.use(bodyParser.json());


// const authencticateJwt = require('./models/auth/authenticate');

//For production -->normal working, with authentication, please comment out this block if you want to run to the integration tests

// app.use('/movies', authencticateJwt, require('./controllers/movie/router'));
// app.use('/main-actors', authencticateJwt, require('./controllers/main-actor/router'));
// app.use('/family-members', authencticateJwt, require('./controllers/family-member/router'));
// app.use('/directors', authencticateJwt, require('./controllers/director/router'));
// app.use('/watched-movies', authencticateJwt, require('./controllers/watched-movie/router'));
// app.use('/login', require('./controllers/login/router'));

//Just for testing purposes-->the authentication is not working here --> please comment out this block if your not testing

// app.use('/movies', require('./controllers/movie/router'));
// app.use('/main-actors', require('./controllers/main-actor/router'));
// app.use('/family-members', require('./controllers/family-member/router'));
// app.use('/directors', require('./controllers/director/router'));
// app.use('/watched-movies', require('./controllers/watched-movie/router'));

// If yout want to sure to work the backend by run, just comment out this block

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