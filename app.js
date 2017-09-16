const express = require("express");
const morgan = require("morgan");
const {PORT = 3000} = process.env;
const app = express();

app.use(morgan("dev"));

app.use((req, res) => {
  res.send({hello: "world"});
});

console.log("listening on %s", PORT);
app.listen(PORT);
