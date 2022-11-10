if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorhandler.js");
const router = require("./routes/index.js");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
