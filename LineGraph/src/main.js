import store from "./store/index.js";

import LineGroup from "./components/line/lineGroup.js";
import Grid from "./components/line/grid.js";

//TODO: 이후 type을 추가해 다양한 그래프를 보여줄 수 있도록 설정
export default class Chart {
  constructor(section, { data, options }) {
    this.section = section;
    this.section.style.position = "relative";

    //Retina Display
    store.commit("SET_PIXEL_RATIO", window.devicePixelRatio);
    //TODO: section의 넓이가 바뀌는 지 확인하고 다시 그려야함
    // window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    if (options.hasOwnProperty("title")) {
      this.title = document.createElement("h2");
      this.title.innerText = options.title;
      this.title.style.textAlign = "center";
      section.appendChild(this.title);
    }

    store.commit("SET_DATA", data.datasets);
    if (options.hasOwnProperty("color")) {
      store.commit("SET_COLOR", options.color);
    } else {
      //TODO: 랜덤 색상이 나오도록 수정
      store.commit("SET_COLOR", ["#000000"]);
    }

    let allOfData = [];
    let maxDataCount = 0;
    if (store.state.datasetCount === 1) {
      allOfData = data.datasets;
      maxDataCount = data.datasets.length;
    } else {
      data.datasets.forEach((element) => {
        maxDataCount = Math.max(maxDataCount, element.length);
        allOfData.push(...element);
      });
    }
    store.commit("SET_MAX_DATA_COUNT", maxDataCount);
    store.commit("SET_MAX_DATA", Math.max(...allOfData));
    //XXX: 값에 대한 초기화와 사용에 있어서 순서 보장에 관해 설정을 해야함. 역할을 분리시킬 방법을 고려해야 함
    //TODO: 초기 데이터 관리를 하는 class를 만들어 이후 데이터가 변경되었을 때도 알아서 바뀔 수 있도록 만들어야 해야 함
    //TODO: 데이터 값을 변경시킬 수 있는 API 만들기
    //TODO: 점과 선에 올렸을 때 선을 강조시켜주는 작업하기 -> 점만 가능하게 만들어보고 선까지 할 수 있도록 만들기
    //TODO: 음수가 나올 경우 아래쪽으로 grid 만들어주기
    //TODO: 면적 채워넣을 수 있도록 만들기
    //TODO: 유선형으로 보여줄 수 있도록 만들기 => y축 label과 데이터 값의 수가 일치하지 않을 경우
    store.commit(
      "SET_X_LABELS",
      data.labels ||
        (function () {
          const xLabel = [];
          for (let i = 0; i < store.state.maxDataCount; i++) {
            xLabel.push(i);
          }
          return xLabel;
        })()
    );
    const yLabel = [];
    for (let i = 0; i <= store.state.maxData; i++) {
      yLabel.push(i);
    }
    store.commit("SET_Y_LABELS", yLabel);
    store.commit("SET_GAP");

    this.grid = new Grid(this.section);
    this.lineGroup = new LineGroup(this.section);
    // section, x, y, xDataset, title
    // xDataset: Array, {borderColor, innerColor, datasetName, value}

    this.render();
  }

  resize() {
    store.commit("SET_CANVAS_SIZE", {
      width: this.section.offsetWidth,
      height: this.section.offsetHeight,
    });
  }

  render() {
    this.grid.render();
    this.lineGroup.render();
  }
}

// 각 class를 실행시킬 때 전달해주어야 하는 값들에 대한 정의가 필요함
// chart.js UI를 조금 참고해도 좋을 듯
