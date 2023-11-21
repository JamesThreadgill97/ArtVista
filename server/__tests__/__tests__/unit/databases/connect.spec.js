const { Pool } = require('pg');
const db = require('../../../database/connect');

describe('DB Connection', () => {
  it('should create a Pool object with the correct connectionString', () => {
    expect(db).toBeInstanceOf(Pool);
    expect(db.options.connectionString).toBe(process.env.DB_URL);
  });
    });