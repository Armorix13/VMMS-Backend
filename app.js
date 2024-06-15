require("./Config/database");

const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./src/Middlewares/error");
const router = require("./src/Routes/index");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const bodyParser = require("body-parser");

// parse json request body
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// Set up API routes
app.use("/img", express.static(path.join(__dirname, "src/view/img")));
app.use("/pdf", express.static(path.join(__dirname, "src/view/pdf")));
app.use("/v1", router);

// Handle undefined routes
app.use("*", (req, res, next) => {
  try {
    throw new Error("Routes Not Found");
  } catch (error) {
    next(error);
  }
});

// Handle errors using custom error handler middleware
app.use(errorHandler);

module.exports = app;
