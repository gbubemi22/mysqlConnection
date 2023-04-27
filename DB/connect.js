const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// Get a connection from the pool
pool.getConnection((err, connection) => {
  if (err) throw err;

  // Use the connection
  connection.query('SELECT * FROM mytable', (err, rows) => {
    if (err) throw err;

    console.log(rows);
    connection.release(); // Release the connection back to the pool
  });
});