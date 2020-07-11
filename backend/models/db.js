const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'message_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connection with database successful")
})

module.exports = connection;