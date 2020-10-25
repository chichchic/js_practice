window.onload = () => {
  const headerBtn = document.getElementsByClassName("header--button")[0];
  const modalContainer = document.getElementsByClassName("modal-container")[0];
  const modal = document.getElementsByClassName("modal")[0];
  const contentBody = document.getElementsByClassName("content-body")[0];

  const closeBtn = document.getElementsByClassName("close-btn")[0];
  const modalBtn = document.getElementsByClassName("modal--button")[0];

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
    if (navStatus) contentBody.classList.toggle("content-body-nav");
    else
      setTimeout(() => {
        contentBody.classList.toggle("content-body-nav");
      }, 300);
    navStatus = !navStatus;
  });
};
