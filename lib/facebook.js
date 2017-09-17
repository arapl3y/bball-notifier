const login = require("facebook-chat-api");

exports.sendMessage = message => {
  return new Promise((resolve, reject) => {
    login(
      { email: process.env.FB_EMAIL, password: process.env.FB_PASSWORD },
      (err, api) => {
        if (err) {
          reject(err);
          return console.error(err);
        }

        api.sendMessage(message, 615267473, err => {
          if (err) {
            reject(err);
          } else {
            resolve(null);
          }
        });
      }
    );
  });
};
