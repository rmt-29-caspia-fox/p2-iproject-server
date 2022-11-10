if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);
app.use(errorHandler);

module.exports = app;

