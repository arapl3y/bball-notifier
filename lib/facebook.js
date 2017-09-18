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

        // api.getThreadList(0, 10, (err, arr) => {
        //   console.log(arr);
        // });

        api.sendMessage(message, 1779962748710700, err => {
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
