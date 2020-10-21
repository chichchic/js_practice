var isNowAppending = false;

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
var index = 1;

const makeCardElement = function (tagName, className, text = null) {
  let newElement = document.createElement(tagName);
  newElement.className = className;
  if (text) newElement.innerText = text;
  return newElement;
};

const makeCard = function () {
  let newCard = makeCardElement("section", "content--card");
  let cardIndex = makeCardElement("div", "content--card__index", index);
  let cardTitle = makeCardElement(
    "h2",
    "content--card__title",
    makeRandomSentence(3)
  );
  let cardBody = makeCardElement(
    "p",
    "content--card__body",
    makeRandomSentence(Math.floor(Math.random() * 15 + 20))
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
  //TODO: 검색 기능 추가하기
  //TODO: README 수정하기
};
