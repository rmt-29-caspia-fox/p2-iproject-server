if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorHandler");

const router = require("./routers");
const app = express();

const https = require("https").createServer(app);
const io = require("socket.io")(https, {
  cors: {
    origins: ["http://localhost:8080", "https://matching-u.web.app"],
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

const PORT = process.env.PORT || 3000;
https.listen(PORT, () => {
  console.log(`listening https on *: ${PORT}`);
});
