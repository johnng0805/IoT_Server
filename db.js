const mysql = require('mysql');
const db = mysql.createConnection({
    host:       'localhost',
    user:       'john',
    password:   'thienbao',
    database:   'iot'   
});
module.exports = db;