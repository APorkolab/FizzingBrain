require('dotenv').config();
const logger = require('./logger/logger');
const mysql = require('mysql2/promise');
const seedDatabase = require('./seed/seeder');
const app = require('./server'); // Az alkalmazás helyes importálása

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
};

const port = process.env.PORT || 3000;

async function checkDatabaseConnection() {
  let retries = 5;
  while (retries) {
    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.end();
      logger.info('Database connection established.');

      // Táblák létrehozása és adatbázis feltöltése
      await seedDatabase();

      app.listen(port, () => {
        logger.info(`App listening at http://localhost:${port}`);
      });
      break;
    } catch (err) {
      logger.error('Unable to connect to the database. Retrying in 5 seconds...');
      logger.error(err.message); // Részletes hibaüzenet
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  if (!retries) {
    logger.error('Failed to connect to the database after multiple attempts.');
    process.exit(1);
  }
}

checkDatabaseConnection();