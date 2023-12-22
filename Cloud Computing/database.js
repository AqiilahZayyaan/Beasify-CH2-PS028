// database.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '34.101.36.126',
    user: 'root',
    password: 'zxq288fm58',
    database: 'excel_beasify',
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to BEASIFY database');

  });
  
  module.exports = connection;