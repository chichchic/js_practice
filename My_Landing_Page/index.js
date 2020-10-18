const concealElement = function (element) {
  element.classList.remove("show-modal");
};

const showElement = function (element) {
  element.classList.add("show-modal");
};

const addClickEvent = function (element, fucn, option = false) {
  element.addEventListener("click", fucn, option);
};
window.onload = () => {
  const headerBtn = document.getElementsByClassName("header--button")[0];
  const modalContainer = document.getElementsByClassName("modal-container")[0];
  const closeBtn = document.getElementsByClassName("close-btn")[0];
  const modalBtn = document.getElementsByClassName("modal--button")[0];

  const navToggle = document.getElementById("toggle");
  let toggleState = false;

  // modal control
  addClickEvent(headerBtn, (e) => {
    showElement(modalContainer);
  });

  addClickEvent(modalContainer, (e) => {
    if (e.target == modalContainer) {
      concealElement(modalContainer);
    }
  });

  addClickEvent(closeBtn, (e) => {
    if (e.target == closeBtn) {
      concealElement(modalContainer);
    }
    e.stopPropagation();
  });

  addClickEvent(modalBtn, (e) => {
    /* 유효성 검사 들어가야함*/
    if (e.target == modalBtn) {
      concealElement(modalContainer);
    }
    e.stopPropagation();
  });

  // navi control
  navToggle.addEventListener("click", (e) => {
    const body = document.getElementsByTagName("body")[0];
    if (!toggleState) {
      toggleState = !toggleState;
      body.classList.add("show-nav");
    } else {
      toggleState = !toggleState;
      body.classList.remove("show-nav");
    }
  });
};
