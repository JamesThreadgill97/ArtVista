const { Pool } = require("pg");

const db = new Pool({
    connectionString: process.env.NODE_ENV === "test"
        ? process.env.DB_TEST_URL
        : process.env.DB_URL
});
console.log("DB connection established.");

module.exports = db;
