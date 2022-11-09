if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const {errorHandler} = require('./middleware/errorsHandlers')

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
  });

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)

app.use(errorHandler)

module.exports = app