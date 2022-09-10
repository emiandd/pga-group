const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3001;
const routes =  require('./routes/index.js');


const app = express();

require('./db.js');


app.use(morgan('dev'))


app.use('/', routes);



module.exports = app;