const http = require("http");
const request = require("request");
const path = require("path");
const dotenv = require("dotenv");
const url = require("url");

const { resolve } = require("path");
dotenv.config({ path: path.join(__dirname, "/.env.local") });
const LOL_API = process.env.LOL_API;

const server = http.createServer();

server.on("request", async function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": "*",
  });
  const urlParse = url.parse(req.url, true);
  const pathName = urlParse.pathname;
  const query = urlParse.query;
  if (req.method === "GET") {
    if (pathName === "/getMatchList") {
      const { name, start, gameCount } = query;
      const accountId = await getAccountId(name);
      const matchList = await getMatchList(accountId, start, gameCount);
      const matchInfo = await getMatchesInfo(matchList);
      res.end(JSON.stringify(matchInfo));
    }
  }
});
server.listen(3000);

function makePromiseRequest(uri) {
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
}

async function getAccountId(name) {
  if (!name) throw "/getMatchList must have summonor name";
  const promise = makePromiseRequest(
    `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`
  );
  const summonerInfo = await promise;
  return JSON.parse(summonerInfo).accountId;
}

async function getMatchList(accountId, startGame = 0, gameCount = 5) {
  const promise = makePromiseRequest(
    `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=${
      startGame + gameCount
    }&beginIndex=${startGame}`
  );
  const matchList = await promise;
  return JSON.parse(matchList).matches;
}

async function getMatchesInfo(matchList) {
  const promises = matchList.map(({ gameId }, index) => {
    return makePromiseRequest(
      `https://kr.api.riotgames.com/lol/match/v4/matches/${gameId}`
    );
  });
  const matchInfo = await Promise.all(promises);
  return matchInfo.map((val) => {
    return JSON.parse(val);
  });
}
