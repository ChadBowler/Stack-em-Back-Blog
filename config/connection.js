const Sequelize = require('sequelize');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: PORT
    }
  );
}

module.exports = sequelize;
