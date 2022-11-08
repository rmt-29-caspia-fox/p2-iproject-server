if (process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}

const express = require('express');
const cors = require('cors');
const app = express();
const route = require('./routes');
const errors = require("./middleware/errorHendler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(route)
app.use(errors)

module.exports = app;
