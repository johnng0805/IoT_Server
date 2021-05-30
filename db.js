const dotenv = require('dotenv');
dotenv.config();

const mysql = require('mysql');
const db = mysql.createConnection({
    host:       process.env.DB_HOST || 'localhost',
    user:       process.env.DB_USER || 'john',
    password:   process.env.DB_PASS || 'thienbao',
    database:   process.env.DB_NAME || 'iot'   
});
module.exports = db;