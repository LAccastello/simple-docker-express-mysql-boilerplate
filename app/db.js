const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DIALECT } = process.env;
const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: MYSQL_DIALECT,
  operatorsAliases: 0,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const modelsDirectory = path.dirname(__dirname) + '/app/models/';

// iterate over models directory and initialize each of them
const models = Object.assign({}, ...fs.readdirSync(modelsDirectory)
  .map(function (file) {
    const model = require(path.join(modelsDirectory + file));
    return {
      [model.name]: model.init(sequelize)
    };
  })
);
// create associations between models
for (const model of Object.keys(models)) {
  typeof models[model].associate === 'function' && models[model].associate(models);
}

// ie create relationships in the ORM
Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

db.models = models;

module.exports = db;