var http = require("http");
var request = require("request");
let result;

var server = http.createServer(function (request, response) {
  response.writeHead(200, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  response.end(result);
});

server.listen(3000, function () {
  return getSumonorData();
  console.log("Server is running...");
});

function getSumonorData() {
  request(
    "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/chichchic?api_key=RGAPI-bcc2a10e-d722-40e1-83d9-4a725911c4c2",
    function (error, res, body) {
      result = body;
    }
  );
  return result;
}
