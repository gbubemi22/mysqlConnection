import { Sequelize, DataTypes } from 'sequelize';
import config from './config';
import { ACCOUNT_TYPES } from '../constaint'

// Create a new Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

// Define the User model
const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: 'Invalid email address'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    enum: ACCOUNT_TYPES,
    default: ACCOUNT_TYPES.USER
  }
});

// Sync the User model with the database
(async () => {
  await sequelize.sync({ force: true });
})();

// Export the User model
module.exports = User;