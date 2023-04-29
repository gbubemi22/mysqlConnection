export default {
  host: process.env.HOST,
  user: 'root',
  password: 'password@123',
  database: process.env.DATABASE,
  dialect: 'mysql',
  port: process.env.DB_PORT
};
