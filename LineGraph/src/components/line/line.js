import store from "../../store/index.js";

import { makeCanvas } from "../../utils/common.js";
export default class Line {
  constructor(section, dataSet, zIndex, color) {
    this.color = color;
    this.points = [];

    Object.assign(
      this,
      makeCanvas(
        store.state.canvasSize.width,
        store.state.canvasSize.height,
        (zIndex + 1) * 2
      )
    );
    section.appendChild(this.canvas);

    dataSet.forEach((element, index) => {
      this.points.push({
        x: index * store.state.gap.x + store.state.padding.left,
        y:
          store.state.canvasSize.height -
          store.state.padding.bottom -
          element * store.state.gap.y,
      });
    });
  }

  render() {
    console.log(this.ctx);
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.moveTo(this.points[0].x, this.points[0].y);
    console.log(this.points[0].x, this.points[0].y);
    for (let i = 0; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    this.ctx.stroke();

    //TODO: dot.js로 분리시킨 후 dot의 정보를 set 또는 object로 관리해 tooltip에서 사용할 수 있도록 만들 것
    //TODO: zIndex를 기반으로 정보의 순서를 저장하기.

    this.points.forEach((element, index) => {
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(
        this.points[index].x,
        this.points[index].y,
        6,
        6,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
      this.ctx.fillStyle = "#ffffff";
      this.ctx.beginPath();
      this.ctx.arc(
        this.points[index].x,
        this.points[index].y,
        3,
        6,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
    });
  }
}
