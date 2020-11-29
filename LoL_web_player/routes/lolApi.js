var express = require("express");
const request = require("request");
const url = require("url");

var router = express.Router();

const { getSummonorInfoByName } = require("./outerApi/summonor");
const { getMatchList, getMatchesInfo } = require("./outerApi/match");
const { getLeagueEntryById } = require("./outerApi/league");

/* GET home page. */
router.get("/summonor", async function (req, res, next) {
  const urlParse = url.parse(req.url, true);
  const { name } = urlParse.query;
  const summonerInfo = await getSummonorInfoByName(name);
  res.json(summonerInfo);
  res.end();
});

router.get("/matchList", async function (req, res, next) {
  const urlParse = url.parse(req.url, true);
  const { accountId, start, gameCount } = urlParse.query;

  const matchList = await getMatchList(accountId, start, gameCount);
  res.json(matchList);
  res.end();
});

router.get("/matchInfo", async function (req, res, next) {
  const urlParse = url.parse(req.url, true);
  const { matchId } = urlParse.query;

  const matchInfo = await getMatchesInfo(matchId);
  res.json(matchInfo);
  res.end();
});

router.get("/rank", async function (req, res, next) {
  const urlParse = url.parse(req.url, true);
  const { id } = urlParse.query;

  const rankInfo = await getLeagueEntryById(id);

  res.json(JSON.parse(rankInfo));
  res.end();
});

module.exports = router;
