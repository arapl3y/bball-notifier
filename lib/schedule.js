const cheerio = require("cheerio");

// Extract accepts HTML of the wardell warriors website
// And returns the schedule of tomorrow's game

exports.extract = html => {
  const $ = cheerio.load(html);

  const tableRows = $(
    "#main_left > div > div.panel-pane.pane-team-game > div > div.left_content > table tr"
  );

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  function pad(number) {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  }

  var tomorrowDate = `${pad(tomorrow.getDate())}/${pad(
    tomorrow.getMonth()
  )}/${tomorrow.getFullYear()}`;

  // var tomorrowDate = "21/09/2017";

  let result = null;

  tableRows.each((i, content) => {
    const tr = $(content);
    const schedule = tr.find("td:nth-child(6)").text();
    if (!schedule) return;
    const scheduleDate = schedule.split(" - ")[0];
    if (tomorrowDate === scheduleDate) {
      result = schedule;
    }
  });

  return result;
};
