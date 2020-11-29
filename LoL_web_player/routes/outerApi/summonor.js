const { makePromiseRequest } = require("../common");

const link = "https://kr.api.riotgames.com/lol/summoner/v4";
exports.getSummonorInfoByName = async function (name) {
  if (!name) throw "/getMatchList must have summonor name";
  const promise = makePromiseRequest(
    link + `/summoners/by-name/${encodeURI(name)}`
  );
  const summonerInfo = await promise;
  return JSON.parse(summonerInfo);
};
