const dotenv = require('dotenv');
dotenv.config();
const options = require('knex-stringcase')({
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      debug: process.env.DB_DEBUG === 'true',
      charset: 'utf8mb4',
      supportBigNumbers: true
    },
    pool: { min: 5, max: parseInt(process.env.DATA_DB_POLL_SIZE, 10) || 15 }
  })
 
  module.exports = require('knex')(options)