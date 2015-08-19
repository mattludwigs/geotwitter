"use strict";

var express = require("express"),
    logger = require("morgan"),
    auth = require("./server/auth"),
    config = require("./config");

var app = express();

auth.
  importConfig(config)
  .getNewOAuth();

app.use(logger("dev"));
app.use(express.static("out/assets"));
app.use(require("./server/routes/twitter-search"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/out/index.html");
});


app.listen(5000, function() {
    console.log('Express server listening on port ' + 5000);
});
