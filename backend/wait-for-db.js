async function checkDatabaseConnection() {
  let retries = 5;
  while (retries) {
    try {
      const connection = await mysql.createConnection(dbConfig);
      await connection.end();
      logger.info('Database connection established. Seeding database...');

      // Táblák létrehozása és adatbázis feltöltése
      await seedDatabase();

      app.listen(port, () => {
        logger.info(`App listening at http://localhost:${port}`);
      });
      break;
    } catch (err) {
      logger.error('Unable to connect to the database. Retrying in 5 seconds...');
      logger.error(err);
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