if (process.env.NODE_ENV !== "production"){
	require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(router)

app.use(errorHandler)


app.listen(port, () => {
	console.log(`App listen on port ${port}`);
})

module.exports = app