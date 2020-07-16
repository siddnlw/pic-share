const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./config/routes");
const logger = require("morgan");
var mongoose = require("./config/mongoose");

const API_PORT = process.env.PORT || 3001;
const app = express();
const router = express.Router();

let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());
app.use("/images", express.static("./uploads"));

if (process.env.NODE_ENV === "production")
  app.use("/", express.static("../ui/build"));

routes(router);

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
