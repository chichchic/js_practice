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

async function getChampionJson() {
  const req = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json"
  );
  const { data } = await req.json();
  const championName = new Object();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const championNum = data[key].key;
      championName[championNum] = key;
    }
  }
  return championName;
}

async function getSpellJson() {
  const req = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/summoner.json"
  );
  const { data } = await req.json();
  const spellName = new Object();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const spellNum = data[key].key;
      spellName[spellNum] = key;
    }
  }
  return spellName;
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

function createMatchCard(
  championNumtoName,
  spellName,
  { gameId, gameDuration, teams, participants, mapId, participantIdentities }
) {
  const {
    card,
    spellFirst,
    spellSecond,
    runeFirst,
    runeSecond,
    championImg,
    championInfoKDA,
    championInfoLv,
    championInfoCK,
    championInfoCS,
    itemBox,
    ward,
    blueTeam,
    redTeam,
  } = createMatchCardLayout();
  const isBlueWin =
    teams[0].teamId === 100 ? teams[0].win === "Win" : teams[0].win !== "Win";
  const isRegame = gameDuration < 300;
  const gameDurationMinute = Math.floor(gameDuration / 60);

  let summonorWin = null;
  let blueTeamIndex = 0;
  let redTeamIndex = 0;
  let blueTotalKill = 0;
  let redTotalKill = 0;
  let summonorKA = null;
  participants.forEach(
    async ({
      teamId,
      championId,
      spell1Id,
      spell2Id,
      stats,
      participantId,
    }) => {
      const isBlue = teamId === 100;
      const summonerName =
        participantIdentities[participantId - 1].player.summonerName;
      const {
        totalMinionsKilled,
        neutralMinionsKilled,
        neutralMinionsKilledTeamJungle,
        neutralMinionsKilledEnemyJungle,
        champLevel,
        kills,
        deaths,
        assists,
      } = stats;
      if (summonerName === summonorInfo.name) {
        summonorWin = teamId === 100 ? isBlueWin : !isBlueWin;
        championImg.src = `/images/champion/${championNumtoName[championId]}.png`;

        spellFirst.src = `/images/spell/${spellName[spell1Id]}.png`;
        spellSecond.src = `/images/spell/${spellName[spell2Id]}.png`;
        const totalCS = totalMinionsKilled + neutralMinionsKilled;
        championInfoCS.innerText = `${totalCS} (${
          Math.floor((totalCS / gameDurationMinute) * 100) / 100
        })`;
        championInfoLv.innerText = `LV: ${champLevel}`;
        championInfoKDA.innerText = `${kills}/${deaths}/${assists}`;
        summonorKA = kills + assists;
        for (let i = 0; i < 6; i++) {
          const key = `item${i}`;
          itemBox.children[i].src = `/images/item/${stats[key]}.png`;
        }
        ward.src = `/images/item/${stats["item6"]}.png`;
      }
      if (isBlue) {
        blueTotalKill += kills;
      } else {
        redTotalKill += kills;
      }
      const elementTeam = isBlue ? blueTeam : redTeam;
      const teamIndex = isBlue ? blueTeamIndex++ : redTeamIndex++;
      elementTeam.children[teamIndex].getElementsByTagName(
        "img"
      )[0].src = `/images/champion/${championNumtoName[championId]}.png`;
      elementTeam.children[teamIndex].getElementsByTagName(
        "span"
      )[0].innerText = summonerName;
    }
  );
  championInfoCK.innerText = `${Math.floor(
    (summonorKA / (summonorWin === isBlueWin ? blueTotalKill : redTotalKill)) *
      100
  )}%`;
  if (isRegame) {
    card.backgroundColor = "gray";
  } else if (summonorWin) {
    card.backgroundColor = "blue";
  } else {
    card.backgroundColor = "red";
  }
  return card;
  //분당 cs계산 공식
}

function createMatchCardLayout() {
  const card = document.createElement("article");

  const spell = document.createElement("div");
  spell.className = "spell";
  const spellFirst = document.createElement("img");
  const spellSecond = document.createElement("img");
  spell.appendChild(spellFirst);
  spell.appendChild(spellSecond);
  const rune = document.createElement("div");
  rune.className = "rune";
  const runeFirst = document.createElement("img");
  const runeSecond = document.createElement("img");
  rune.appendChild(runeFirst);
  rune.appendChild(runeSecond);

  const champion = document.createElement("div");
  champion.className = "champion";
  const championImg = document.createElement("img");
  championImg.alt = "champion image";
  const championInfo = document.createElement("div");
  championInfo.className = "championInfo";
  const championInfoKDA = document.createElement("h3");
  const championInfoLv = document.createElement("div");
  const championInfoCK = document.createElement("div");
  const championInfoCS = document.createElement("div");
  championInfo.appendChild(championInfoKDA);
  championInfo.appendChild(championInfoLv);
  championInfo.appendChild(championInfoCK);
  championInfo.appendChild(championInfoCS);
  champion.appendChild(championImg);
  champion.appendChild(championInfo);

  const items = document.createElement("div");
  const itemBox = document.createElement("div");
  for (let i = 0; i < 6; i++) {
    const item = document.createElement("img");
    itemBox.appendChild(item);
  }
  const ward = document.createElement("img");
  items.appendChild(itemBox);
  items.appendChild(ward);

  const participants = document.createElement("div");
  participants.className = "participants";
  const blueTeam = document.createElement("div");
  blueTeam.className = "blueTeam";
  for (let i = 0; i < 5; i++) {
    const participantInfo = document.createElement("div");
    participantInfo.className = "participantInfo";
    const participantImg = document.createElement("img");
    const participantName = document.createElement("span");
    participantInfo.appendChild(participantImg);
    participantInfo.appendChild(participantName);
    blueTeam.appendChild(participantInfo);
  }
  const redTeam = document.createElement("div");
  redTeam.className = "redTeam";
  for (let i = 0; i < 5; i++) {
    const participantInfo = document.createElement("div");
    const participantImg = document.createElement("img");
    const participantName = document.createElement("span");
    participantInfo.appendChild(participantImg);
    participantInfo.appendChild(participantName);
    redTeam.appendChild(participantInfo);
  }
  participants.appendChild(redTeam);
  participants.appendChild(blueTeam);

  card.appendChild(spell);
  card.appendChild(rune);
  card.appendChild(champion);
  card.appendChild(items);
  card.appendChild(participants);

  return {
    card,
    spellFirst,
    spellSecond,
    runeFirst,
    runeSecond,
    championImg,
    championInfoKDA,
    championInfoLv,
    championInfoCK,
    championInfoCS,
    itemBox,
    ward,
    blueTeam,
    redTeam,
  };
}

async function getRankInfo() {
  const resultJson = await fetch(apiUrl + `/rank?id=${summonorInfo.id}`);
  // typeof Array
  // wins, losses, rank, tier, leaguePoints, queueType
  const rankInfo = await resultJson.json();
  const soloRankInfo = document.querySelector(".solo-rank");
  const flexRankInfo = document.querySelector(".flex-rank");
  rankInfo.forEach((data) => {
    const card =
      data.queueType === "RANKED_FLEX_SR" ? flexRankInfo : soloRankInfo;
    if (!card) return;
    card.querySelector(
      ".img"
    ).src = `/images/ranked-emblems/Emblem_${data.tier}.png`;
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
  const championNumtoName = await getChampionJson();
  const spellName = await getSpellJson();
  for (const { gameId } of matchListInfos) {
    const matchInfo = await getMatchInfo(gameId);
    const match = createMatchCard(championNumtoName, spellName, matchInfo);
    matchLists.appendChild(match);
  }
}

init();
