if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const { errorHandler } = require("./middleware/errorsHandlers");

const port = process.env.PORT || 3000
const server = require('http').createServer(app);
const socket = require("socket.io");
// const io = require('socket.io')(server);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: [process.env.CLIENT_URL],
//     methods: ["GET", "POST"],
//     credentials: true,
//     transports: ["websocket", "polling"],
//   },
//   allowEIO3: true,
// });

const io = socket(server, {
  cors: { origin: process.env.CLIENT_URL },
});

io.on("connection", (socket) => {
  console.log("||||a user connected", socket.id, "<<<");
  socket.on("update-patch", (arg) => {
      io.emit("updated-admin", "test");
      console.log("Patch on run");
    });

  socket.on("register-form-order", () => {
    io.emit("registered-customer");
    });
});



app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.use(errorHandler);

server.listen(port,()=>{
  console.log(`listenin in port: ${port}`)
});

// module.exports = app;
