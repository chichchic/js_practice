import store from "./store/index.js";

import LineGroup from "./components/line/lineGroup.js";
import Grid from "./components/line/grid.js";

//TODO: 이후 type을 추가해 다양한 그래프를 보여줄 수 있도록 설정
export default class Chart {
  constructor(section, { data, options }) {
    this.section = section;

    //Retina Display
    store.commit("SET_PIXEL_RATIO", window.devicePixelRatio);
    //TODO: section의 넓이가 바뀌는 지 확인하고 다시 그려야함
    // window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    if (options.hasOwnProperty("title")) {
      this.title = document.createElement("h2");
      this.title.innerText = options.title;
      section.appendChild(this.title);
    }

    store.commit("SET_DATA", data.datasets);
    if (options.hasOwnProperty("color")) {
      store.commit("SET_COLOR", options.color);
    } else {
      //TODO: 랜덤 색상이 나오도록 수정
      store.commit("SET_COLOR", ["#000000"]);
    }

    //XXX: 값에 대한 초기화와 사용에 있어서 순서 보장에 관해 설정을 해야함. 역할을 분리시킬 방법을 고려해야 함
    //TODO: 초기 데이터 관리를 하는 class를 만들어 이후 데이터가 변경되었을 때도 알아서 바뀔 수 있도록 만들어야 해야 함
    this.lineGroup = new LineGroup(this.section);
    store.commit(
      "SET_X_LABELS",
      data.labels ||
        data.datasets.map((_, index) => {
          return index + 1;
        })
    );
    const yLabel = [];
    for (let i = 0; i <= store.state.maxData; i++) {
      yLabel.push(i);
    }
    store.commit("SET_Y_LABELS", yLabel);
    store.commit("SET_GAP");
    this.grid = new Grid(this.section);

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
  }
}

// 각 class를 실행시킬 때 전달해주어야 하는 값들에 대한 정의가 필요함
// chart.js UI를 조금 참고해도 좋을 듯
