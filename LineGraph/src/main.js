import store from "./store/index.js";

import LineGroup from "./components/line/lineGroup.js";
import Grid from "./components/line/grid.js";

//TODO: 이후 type을 추가해 다양한 그래프를 보여줄 수 있도록 설정
//TODO: legend 만드는 class 생성하기 + 이에 따른 padding 값 설정하기

export default class Chart {
  constructor(section, { data, options }) {
    this.section = section;
    this.section.style.position = "relative";

    //Retina Display
    store.commit("SET_PIXEL_RATIO", window.devicePixelRatio);
    window.addEventListener("resize", this.init.bind(this), false);
    this.init(data, options);

    this.render();
  }

  init(data, options) {
    store.commit("SET_CANVAS_SIZE", {
      width: this.section.offsetWidth,
      height: this.section.offsetHeight,
    });
    store.commit("SET_LABELS", data.labels);
    store.commit("SET_DATASETS", data.datasets);

    if (options.hasOwnProperty("title") && options.title.display) {
      //있을 경우 섹션 첫번째로 무조건 들어가야함
      if (!options.title.hasOwnProperty("text")) {
        throw "if options.title.display is true, options.title Object must have text property";
      }
      this.title = document.createElement("h2");
      this.title.innerText = options.title.text;
      this.title.style.textAlign = "center";
      this.section.appendChild(this.title);
      store.commit("ADD_PADDING", { top: 35 });
    }

    let maxCandidate = 0;
    let minCandidate = 0;
    store.state.datasets.forEach(({ data }) => {
      data.forEach((data) => {
        maxCandidate = Math.max(maxCandidate, data);
        minCandidate = Math.min(minCandidate, data);
      });
    });
    store.commit("SET_MAX_DATA", maxCandidate);
    store.commit("SET_MIN_DATA", minCandidate);

    const maxAbsData = Math.max(
      Math.abs(store.state.maxData),
      Math.abs(store.state.minData)
    );
    let unit = Math.pow(10, Math.floor(Math.log10(maxAbsData - 1)));
    if (maxAbsData >= unit * 5) {
      unit *= 5;
    }
    store.commit("SET_UNIT", { unit, maxAbsData });

    this.grid = new Grid(this.section, options.scales);
  }

  render() {
    this.grid.render();
  }
}

// 각 class를 실행시킬 때 전달해주어야 하는 값들에 대한 정의가 필요함
// chart.js UI를 조금 참고해도 좋을 듯
