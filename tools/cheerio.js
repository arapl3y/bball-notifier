const schedule = require("../lib/schedule.js");
const data = require("./data.js");

const result = schedule.extract(data);

console.log(result);
