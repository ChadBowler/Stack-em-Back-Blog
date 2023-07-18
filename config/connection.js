const Sequelize = require('sequelize');
require('dotenv').config();
const PORT = process.env.PORT || 3306;

let sequelize;

if (process.env.JAWSDB_AMBER) {
  sequelize = new Sequelize(process.env.JAWSDB_AMBER);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '0.0.0.0',
      dialect: 'mysql',
      port: PORT
    }
  );
}

module.exports = sequelize;
