const config = require('dotenv').config();
const logger = require('./logger/logger');
const app = require('./server');
const port = process.env.PORT || 3000;
const http = require("http");


const server = http.createServer(app);

if (!config) {
	logger.error('No database config found.');
	process.exit();
}

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});