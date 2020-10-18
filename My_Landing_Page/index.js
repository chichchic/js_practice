window.onload = () => {
  const headerBtn = document.getElementsByClassName("header--button")[0];
  const modalContainer = document.getElementsByClassName("modal-container")[0];
  const closeBtn = document.getElementsByClassName("close-btn")[0];
  const modalBtn = document.getElementsByClassName("modal--button")[0];

  const navToggle = document.getElementById("toggle");

  // modal open
  headerBtn.addEventListener("click", (e) => {
    modalContainer.classList.add("show-modal");
  });

  //modal close
  window.addEventListener("click", (e) => {
    e.target == closeBtn || e.target == modalContainer
      ? modalContainer.classList.remove("show-modal")
      : false;
    if (e.target == modalBtn) {
      /* 유효성 검사 들어가야함 */
      modalContainer.classList.remove("show-modal");
    }
  });

  // navi control
  navToggle.addEventListener("click", (e) => {
    document.body.classList.toggle("show-nav");
  });
};
