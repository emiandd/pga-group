const express = require('express');
const methodOverride = require('method-override')
const path = require('path');
const morgan = require('morgan');
const PORT = process.env.PORT || 3001;
const routes =  require('./routes/index.js');


const app = express();

require('./db.js');


// settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/', routes);



module.exports = app;