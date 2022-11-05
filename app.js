if(process.env.MODE_ENV !== "production"){
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// app.use(router)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// put error handler below

module.exports = app