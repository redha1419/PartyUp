// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    searchPath: process.env.DATABASE_SCHEMA,
    connection: {
      port: process.env.DATABASE_PORT,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    }
  }

};
