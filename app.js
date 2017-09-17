const express = require("express");
const morgan = require("morgan");
const axios = require("axios");
const { extract } = require("./lib/schedule");
const { sendMessage } = require("./lib/facebook");
const { PORT = 3000 } = process.env;
const app = express();

app.use(morgan("dev"));

app.get("/check", async (req, res) => {
  const response = await axios.get(
    "http://sblplayers.com.au/content/wardell-warriors"
  );

  const html = response.data;

  let result = extract(html);

  if (!result) {
    res.send({
      message: "No scheduled games tomorrow"
    });
    return;
  }
  await sendMessage(`Hey guys, the game is at ${result}.`);

  res.send({
    message: "Message sent"
  });
});

console.log("listening on %s", PORT);
app.listen(PORT);
