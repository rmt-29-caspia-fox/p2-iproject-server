if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const { errorHandler } = require("./middleware/errorsHandlers");
const io = require("./socketio");
const e = require("express");
// const http = require('http');
// const server = http.createServer(app);

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

module.exports = app;
