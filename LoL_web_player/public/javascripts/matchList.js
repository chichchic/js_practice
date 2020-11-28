const searchBarSelect = document.querySelector(
  ".matchlist-page--header__search-bar--select"
);
const searchBarInput = document.querySelector(
  ".matchlist-page--header__search-bar--input"
);
const searchBarBtn = document.querySelector(
  ".matchlist-page--header__search-bar--btn"
);

const matchLists = document.querySelector(".matchlist-page--matchlist");

const apiUrl = "http://localhost:3000/lol";

// accountId, id, profileIconId, summonerLevel, revisionDate
let summonorInfo = null;

async function setLanguageOptions() {
  const req = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/languages.json"
  );
  const languages = await req.json();
  languages.forEach((element) => {
    const option = document.createElement("option");
    const nation = element.substr(3);
    option.value = nation;
    option.required = true;
    option.innerText = nation;
    if (nation === "KR") option.selected = true;
    searchBarSelect.appendChild(option);
  });
}

function searchNewName() {
  window.open(`/matchList?name=${searchBarInput.value}`, "self");
}

function addButtonEvent() {
  searchBarBtn.addEventListener("click", searchNewName);
  window.addEventListener("keydown", async (e) => {
    if (searchBarInput === document.activeElement && e.key === "Enter") {
      searchNewName();
    }
  });
}

async function getMatchList(accountId, start = 0, gameCount = 5) {
  const resultJson = await fetch(
    apiUrl +
      `/matchList?accountId=${accountId}&start=${start}&gameCout=${gameCount}`
  );
  return await resultJson.json();
}

async function getMatchInfo(matchId) {
  const resultJson = await fetch(apiUrl + `/matchInfo?matchId=${matchId}`);
  return await resultJson.json();
}

async function getSommonorInfo() {
  const resultJson = await fetch(
    apiUrl + `/summonor?name=${searchBarInput.value}`
  );
  summonorInfo = await resultJson.json();
  document.querySelector(
    ".matchlist-page--basic-info__img"
  ).src = `/images/profileicon/${summonorInfo.profileIconId}.png`;
  document.querySelector(".matchlist-page--basic-info__name").innerHTML =
    summonorInfo.name;
  document.querySelector(
    ".matchlist-page--basic-info__level"
  ).innerHTML = `LV: ${summonorInfo.summonerLevel}`;
}

async function getRankInfo() {
  const resultJson = await fetch(apiUrl + `/rank?id=${summonorInfo.id}`);
  // typeof Array
  // wins, losses, rank, tier, leaguePoints, queueType
  const rankInfo = await resultJson.json();
  const soloRankInfo = document.querySelector(".solo-rank");
  const flexRankInfo = document.querySelector(".flex-rank");
  console.log(rankInfo[0]);
  rankInfo.forEach((data) => {
    const card =
      data.queueType === "RANKED_FLEX_SR" ? flexRankInfo : soloRankInfo;
    if (!card) return;
    card.querySelector(
      ".img"
    ).src = `/images/ranked-emblems/Emblem_${data.tier}.png`;
    console.log(card.getElementsByTagName("img"));
    card.querySelector(".rank").innerText = `${data.tier} ${data.rank}`;
    card.querySelector(
      ".static"
    ).innerText = `${data.leaguePoints} Lp / ${data.wins} W / ${data.losses} L`;
    card.querySelector(".ratio").innerText = `Win Ratio ${
      Math.floor((data.wins / (data.losses + data.wins)) * 100 * 100) / 100
    }%`;
  });
}

async function init() {
  setLanguageOptions();
  addButtonEvent();
  const parsedUrl = new URL(window.location.href);
  const inputName = parsedUrl.searchParams.get("name");
  searchBarInput.value = inputName;
  await getSommonorInfo();
  getRankInfo();
  const matchListInfos = await getMatchList(summonorInfo.accountId);

  for (const { gameId } of matchListInfos) {
    const matchInfo = await getMatchInfo(gameId);
    const match = document.createElement("div");
    match.innerText = matchInfo;
    matchLists.appendChild(match);
  }
}

init();
