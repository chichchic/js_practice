const { makePromiseRequest } = require("../common");

const link = "https://kr.api.riotgames.com/lol/match/v4";

exports.getMatchList = async function (
  accountId,
  startGame = 0,
  gameCount = 5
) {
  const promise = makePromiseRequest(
    link +
      `/matchlists/by-account/${accountId}?endIndex=${
        Number(startGame) + Number(gameCount)
      }&beginIndex=${startGame}`
  );
  const matchList = await promise;
  return JSON.parse(matchList).matches;
};

exports.getMatchesInfo = async function (matchId) {
  const promises = makePromiseRequest(link + `/matches/${matchId}`);
  const matchInfo = await promises;
  return JSON.parse(matchInfo);
};
