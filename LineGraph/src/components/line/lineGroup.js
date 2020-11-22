/*
역할: line rendering 관리 및 tooltip 생성
*/

import store from "../../store/index.js";
import { dotHover } from "../event.js";
import Line from "./line.js";

export default class LineGroup {
  constructor(section, { display = true }) {
    this.lines = [];
    store.state.datasets.forEach((element, index) => {
      this.lines.push(new Line(section, index, element));
    });
    // dotHover.apply(this, [section, 10]);
  }

  render() {
    this.lines.forEach((element) => {
      element.render();
    });
  }

  renderMouseOn(index) {
    this.lines.forEach((element) => {
      element.render(index);
    });
  }
}
// 그리드와 선들을 그려주는 역할을 수행
// 마우스 오버시 다른 선들의 색상을 연하게 만들어야함
//x축과 y축에 숫자도 표현
// legend를 만들어주는 class를 따로 만들면 좋을것 같음
