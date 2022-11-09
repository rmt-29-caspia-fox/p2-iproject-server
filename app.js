if (process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}
const express = require('express');
const app = express()
const cors = require('cors');
const errors = require("./middleware/error-hendler");
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(json())

app.use(route)

app.use(errors)

app.listen(port)