export default {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: 'mysql',
  port: process.env.DB_PORT
};
