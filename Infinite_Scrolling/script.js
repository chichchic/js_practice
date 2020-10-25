let isNowAppending = false;
const content = document.querySelector(".content");
const loader = document.querySelector(".loader");
let index = 0;
const limit = 5;
let searchInputStr = null;

//검색 함수
const filterCards = function (searchInput) {
  searchInputStr = searchInput;
  const contentCards = document.querySelectorAll(".content--card");
  contentCards.forEach((element, index) => {
    if (element.innerText.includes(searchInput)) {
      contentCards[index].style.display = "block";
    } else {
      contentCards[index].style.display = "none";
    }
  });
};

// 가데이터 받아오는 함수
async function getPosts() {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${index}`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    } else return Promise.reject(`${res.status} Error: Can't get datas`);
  } catch (error) {
    console.error(e);
  }
}

//카드 생성 함수
const makeCard = function ({ title, body }) {
  const newCard = document.createElement("section");
  newCard.classList.add("content--card");
  newCard.innerHTML = `
  <div class="content--card__index">${index + 1}</div>
  <h2 class="content--card__title">${title}</h2>
  <p class="content--card__body">${body}</p>
  `;
  index++;
  return newCard;
};

// 카드 5개를 화면에 추가해주는 함수
const appendFiveCard = async function (element) {
  loader.classList.add("show");
  const datas = await getPosts();
  console.log(datas);
  loader.classList.remove("show");
  datas.forEach((dataContent) => {
    element.appendChild(makeCard(dataContent));
  });
  // 더이상 들어올 데이터가 없을 때
  if (datas.length === 0) isNowAppending = true;
  else isNowAppending = false;
};

/*
  화면에 loading element가 들어있는지 확인하는 함수
  만일 loading이 들어와 있을 경우 새로운 card를 만든다.
*/
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!isNowAppending && !searchInputStr && entry.isIntersecting) {
        isNowAppending = true;
        appendFiveCard(content);
      }
    });
  },
  { threshold: 0.3 }
);

function init() {
  observer.observe(loader);
}

init();
