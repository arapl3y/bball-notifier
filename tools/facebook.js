const { sendMessage } = require("../lib/facebook.js");
const { listThreads } = require("../lib/facebook.js");

// listThreads().then(arr => {
//   console.log(arr);
// });

sendMessage('WardellBot test')
  .catch(err => {
    console.error(err);
  });
