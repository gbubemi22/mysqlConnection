import mysql from 'mysql2';

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

// Get a connection from the pool


// Initialize the connection pool
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) throw err;
    
      // Use the connection
      connection.query('SELECT * FROM tut', (err, rows) => {
        if (err) throw err;
    
        console.log(rows);
    
        connection.release(); // Release the connection back to the pool
        resolve();
      });
    });
  });
}

export default initializeDatabase