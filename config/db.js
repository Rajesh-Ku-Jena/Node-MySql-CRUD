const mysql = require('mysql2/promise')

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'2437',
    database: 'school'
})

module.exports = mySqlPool