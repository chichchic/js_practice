const searchBarSelect = document.querySelector(
  ".init--content__search-bar--select"
);
const searchBarInput = document.querySelector(
  ".init--content__search-bar--input"
);
const searchBarBtn = document.querySelector(".init--content__search-bar--btn");

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

async function getMatchList() {
  const resultJson = await fetch(
    `http://localhost:3000/getMatchList?name=${searchBarInput.value}&start=0&gameCount=5`
  );
  const result = await resultJson.json();
  console.log(result);
}

setLanguageOptions();
searchBarBtn.addEventListener("click", getMatchList);
window.addEventListener("keydown", (e) => {
  if (searchBarInput === document.activeElement && e.key === "Enter") {
    getMatchList();
  }
});
