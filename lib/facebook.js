const login = require("facebook-chat-api");

const wardellWarriorsThreadId = 1779962748710700;
const testThreadId = 615267473;

exports.sendMessage = message => {
  return new Promise((resolve, reject) => {
    login(
      { email: process.env.FB_EMAIL, password: process.env.FB_PASSWORD },
      (err, api) => {
        if (err) {
          reject(err);
          return console.error(err);
        }

        api.sendMessage(message, wardellWarriorsThreadId, err => {
          if (err) {
            console.log(`Failed to send FB message: ${message}`);
            reject(err);
          } else {
            console.log(`Successfully sent FB message: ${message}`);
            resolve(null);
          }
        });
      }
    );
  });
};

exports.listThreads = () => {
  return new Promise((resolve, reject) => {
    login(
      { email: process.env.FB_EMAIL, password: process.env.FB_PASSWORD },
      (err, api) => {
        if (err) {
          reject(err);
          return console.error(err);
        }

        api.getThreadListGraphQL(50, +new Date(), (err, arr) => {
          if (err) {
            reject(err);
          } else {
            resolve(arr);
          }
        });

      }
    );
  });
}