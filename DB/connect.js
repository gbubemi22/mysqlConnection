import mysql from 'mysql2';

// Create a connection pool
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: 'root',
  password: 'password@123',
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

// Get a connection from the pool


// Initialize the connection pool
function initializeDatabase() {
  connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
    } else {
        console.log('Connected to MySQL database!');
    }
});

connection.end();
}

export default initializeDatabase