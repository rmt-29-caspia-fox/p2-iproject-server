if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const port = process.env.PORT || 3000
const express = require("express");
// const Middleware = require("./middleware");
const app = express();
const router = require("./routes");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);


app.listen(port, ()=> {
  console.log(`Run port ${port}`)
})