const { Pool } = require('pg')
const fs = require('fs')

const dotenv = require('dotenv')
dotenv.config()


const reset = fs.readFileSync(__dirname + '/reset.sql').toString();

const resetTestDB = async () => {
  try {
    const db = new Pool({
      connectionString: process.env.DB_TEST_URL,
    });

    console.log('DB connection established.');
    await db.query(reset);
    console.log('Test DB reset successfully.');

    await db.end();
    console.log('DB connection closed.');
  } catch (err) {
    console.error('Error during Test DB reset:', err.message);
    throw new Error('Could not reset TestDB');
  }
};

module.exports = { resetTestDB }