const express = require("express");
const morgan = require("morgan");
const sbl = require("./lib/sbl");
const { extract } = require("./lib/schedule");
const { sendMessage } = require("./lib/facebook");
const { PORT = 3000 } = process.env;
const app = express();

app.use(morgan("dev"));

app.use(express.static('static'));


app.get("/check", async (req, res) => {
  let rounds;

  try {
    rounds = await sbl.getRounds();
  } catch (err) {
    res.status(400).send({
      error: `SBL API: ${err.toString()}`
    })
    return;
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Remove hours, minutes & seconds
  tomorrow.setHours(0, 0, 0, 0);

  rounds.forEach(round => {
    const compareRoundTime = new Date(round.timestamp * 1000);

    const roundTime = compareRoundTime.toLocaleTimeString();

    compareRoundTime.setHours(0, 0, 0, 0);

    if (+compareRoundTime === +tomorrow) {
      sendMessage(`The next game is ${round.matches[0].name} at ${roundTime} tomorrow.`);
    }
  })
  res.send({
    message: 'Done',
    rounds: rounds
  });
})

process.on('unhandledRejection', err => {
  console.log(err.stack);
})

console.log("listening on %s", PORT);
app.listen(PORT);
