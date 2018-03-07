// @flow
"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const DefaultConfig = require("./config");

const app = express();
app.set("port", process.env.PORT || DefaultConfig.port);
app.use(express.static("static"));
app.use(logger("dev"));
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(cors());

process.on("unhandledRejection", (reason, p) => {
	console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
});

app.use("/api/", apiRoutes());

app.listen(app.get("port"));
console.log(`App listening on ${app.get("port")}`);

module.exports = app;
