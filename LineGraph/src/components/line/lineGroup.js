import store from "../../store/index.js";

import Line from "./line.js";

export default class LineGroup {
  constructor(section) {
    this.lines = [];
    console.log(store.state.color);
    store.state.data.forEach((element, index) => {
      const colorIndex = index % store.state.datasetCount;
      this.lines.push(
        new Line(section, element, index, store.state.color[colorIndex])
      );
    });
  }

  render() {
    this.lines.forEach((element) => {
      element.render();
    });
  }
}
// 그리드와 선들을 그려주는 역할을 수행
// 마우스 오버시 다른 선들의 색상을 연하게 만들어야함
//x축과 y축에 숫자도 표현
// legend를 만들어주는 class를 따로 만들면 좋을것 같음
