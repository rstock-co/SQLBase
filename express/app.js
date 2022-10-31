var express = require("express");
const db = require("./db");
const dbHelpers = require("./helpers/dbHelpers")(db);
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tablesRouter = require("./routes/tables");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/users", usersRouter(dbHelpers));
app.use("/api/tables", tablesRouter(dbHelpers));

module.exports = app;
