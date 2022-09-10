require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { USER, PASSWORD, HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(`mysql://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DB_NAME}`, {
	logging: false
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Reading the models directory and pushing the model definers into modelDefiners.
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inject the connection (sequelize) to all models
modelDefiners.forEach(model => model(sequelize));

// Capitalize names of models, ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};