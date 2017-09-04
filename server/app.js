// Importing our dependencies and any additional
// modules used in our express webserver
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')

// Starting off our Express application
const app = express();
const env = require('dotenv').load();
const PORT = 3000;

// Loading in routes to be used
// in the main express application
const routes = require('./routes');

//Consuming middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// Consuming our express.Router middleware
// that will handle our API endpoints
app.use('/api', routes);


// Listens for a successful connection that
// will be bound to a specified PORT
app.listen(PORT, () => {
    console.log("Check it out, we're cooking somethin' hot on PORT", PORT);
});