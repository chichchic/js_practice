const path = require("path");
const request = require("request");

require("dotenv").config({ path: path.join(__dirname, "../../.env.local") });
const LOL_API = process.env.LOL_API;
exports.makePromiseRequest = function (uri) {
  return new Promise((resolve, reject) => {
    request(
      {
        uri,
        method: "GET",
        headers: {
          "X-Riot-Token": LOL_API,
        },
      },
      function (err, res, body) {
        if (err) {
          throw err;
        }
        resolve(body);
      }
    );
  });
};
