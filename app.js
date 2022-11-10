if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");
const router = require("./routers");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:8080","http://matching-u.web.app"]
  },
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("room 3498", (data) => {
    io.emit("broadcast room 3498", data);
  });

  socket.on("room 4200", (data) => {
    io.emit("broadcast room 4200", data);
  });

  socket.on("room 5286", (data) => {
    io.emit("broadcast room 5286", data);
  });

  socket.on("room 4291", (data) => {
    io.emit("broadcast room 4291", data);
  });

  socket.on("room 12020", (data) => {
    io.emit("broadcast room 12020", data);
  });

  socket.on("room 802", (data) => {
    io.emit("broadcast room 802", data);
  });
});

app.use(errorHandler);

http.listen(3000, () => {
  console.log("listeninghttp on *:3000");
});
