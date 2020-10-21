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

window.onload = () => {
  const content = document.querySelector(".content");
  content.appendChild(makeCard());
  content.appendChild(makeCard());
  content.appendChild(makeCard());
  content.appendChild(makeCard());
  content.appendChild(makeCard());
  //TODO: 스크롤 작업
  //TODO: 검색
  //TODO: 로딩 애니메이션 작업
};
