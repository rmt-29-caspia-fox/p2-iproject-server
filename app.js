const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origins: ['http://localhost:8080']
    }
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("<h1>Hey Socket.io</h1>");
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('my message', (msg) => {
        console.log("masuk",msg);
        io.emit('my broadcast', `server: ${msg}`);
      });
  });

  
http.listen(3000, () => {
  console.log("listeninghttp on *:3000");
});
