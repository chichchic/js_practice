//TODO: 코드 패턴 바꾸기
// 참고 링크 https://github.com/EmilyLee1206/login_validator/blob/gh-pages/script.js

//HACK: 애니메이션 setTimeout 제거하는 방법 찾기

window.onload = () => {
  const headerBtn = document.querySelector(".header--button");
  const modalContainer = document.querySelector(".modal-container");
  const modal = document.querySelector(".modal");
  const contentBody = document.querySelector(".content-body");

  const closeBtn = document.querySelector(".close-btn");
  const modalBtn = document.querySelector(".modal--button");

  const navToggle = document.getElementById("toggle");
  let navStatus = false;

  const fadeIn = function () {
    modalContainer.classList.add("show-modal");
    setTimeout(() => {
      modal.classList.add("fade-in");
    }, 100);
  };

  const fadeOut = function () {
    modal.classList.remove("fade-in");
    setTimeout(() => {
      modalContainer.classList.remove("show-modal");
    }, 100);
  };

  // modal open
  headerBtn.addEventListener("click", (e) => {
    fadeIn();
  });

  //modal close
  modalContainer.addEventListener("click", (e) => {
    e.target == closeBtn || e.target == modalContainer ? fadeOut() : false;
    if (e.target == modalBtn) {
      /* 유효성 검사 들어가야함 */
      fadeOut();
    }
  });

  // navi control
  navToggle.addEventListener("click", (e) => {
    document.body.classList.toggle("show-nav");
    if (navStatus) {
      contentBody.classList.toggle("content-body-nav");
      return;
    } else {
      setTimeout(() => {
        contentBody.classList.toggle("content-body-nav");
      }, 300);
    }
    navStatus = !navStatus;
  });
};
