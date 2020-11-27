const { makePromiseRequest } = require("../common");

const link = "https://kr.api.riotgames.com/lol/league/v4";

exports.getLeagueEntryById = async function (id) {
  const promise = makePromiseRequest(link + `/entries/by-summoner/${id}`);
  const rankInfo = await promise;
  return rankInfo;
};
