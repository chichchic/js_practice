var isNowAppending = false;
const cardContents = [];

const makeRandomSentence = function (wordCnt) {
  const alpha = "abcdefghijklmnopqrstuvwxyz";
  let output = "";
  while (wordCnt-- > 0) {
    wordlen = Math.floor(Math.random() * 8 + 3);
    while (wordlen-- > 0) {
      output += alpha[Math.floor(Math.random() * alpha.length)];
    }
    output += " ";
  }
  return output;
};
var index = 0;

const makeCardElement = function (tagName, className, text = null) {
  let newElement = document.createElement(tagName);
  newElement.className = className;
  if (text) newElement.innerText = text;
  return newElement;
};

const makeCard = function () {
  const newContent = {
    title: makeRandomSentence(3),
    body: makeRandomSentence(Math.floor(Math.random() * 15 + 20)),
  };
  cardContents.push(newContent);
  let newCard = makeCardElement("section", "content--card");
  let cardIndex = makeCardElement("div", "content--card__index", index + 1);
  let cardTitle = makeCardElement(
    "h2",
    "content--card__title",
    cardContents[index].title
  );
  let cardBody = makeCardElement(
    "p",
    "content--card__body",
    cardContents[index].body
  );
  newCard.appendChild(cardIndex);
  newCard.appendChild(cardTitle);
  newCard.appendChild(cardBody);
  index++;
  return newCard;
};

const appendFiveCard = function (element) {
  const loader = document.querySelector(".loader");
  loader.style.display = "flex";
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      element.appendChild(makeCard());
    }
    loader.style.display = "none";
    isNowAppending = false;
  }, 1000);
};

const searchContents = function (searchInput) {
  const contentCards = document.getElementsByClassName("content--card");
  cardContents.forEach((element, index) => {
    if (
      element.title.includes(searchInput) ||
      element.body.includes(searchInput)
    ) {
      contentCards[index].style.display = "block";
    } else {
      contentCards[index].style.display = "none";
    }
  });
};

window.addEventListener("scroll", function (e) {
  if (
    !isNowAppending &&
    window.scrollY + window.innerHeight > document.body.scrollHeight
  ) {
    isNowAppending = true;
    const content = document.querySelector(".content");
    appendFiveCard(content);
  }
});

window.onload = () => {
  const content = document.querySelector(".content");
  appendFiveCard(content);

  //TODO: content 를 한번만찾고 전체 js에서 사용하는 법 찾기
  //TODO: 스크롤 최하단으로 내렸는지 여부가 조금 삐져나오는거 해결하기 + 스크롤 이벤트가 아닌 하단 박스로 체크하는 방식 변경하기
};
