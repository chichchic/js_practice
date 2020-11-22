import store from "../../store/index.js";

import { makeCanvas } from "../../utils/common.js";
export default class Line {
  constructor(section, dataSet, lineNumber, color) {
    this.color = color;
    this.points = [];
    this.lineNumber = lineNumber;

    Object.assign(
      this,
      makeCanvas(
        store.state.canvasSize.width,
        store.state.canvasSize.height,
        (lineNumber + 1) * 2
      )
    );
    section.appendChild(this.canvas);

    dataSet.forEach((element, index) => {
      const dot = {
        x: index * store.state.gap.x + store.state.padding.left,
        y:
          store.state.canvasSize.height -
          store.state.padding.bottom -
          element * store.state.gap.y,
      };
      this.points.push(dot);
      store.commit("ADD_DOT_POINTS_DATA", {
        ...dot,
        title: " ",
        lineNumber: lineNumber,
        zIndex: (lineNumber + 1) * 2,
        xDataset: {
          borderColor: color,
          innerColor: color,
          datasetName: "datasetName",
          value: element,
        },
      });
    });
  }

  //TODO: 면적 채워넣을 수 있도록 만들기
  //TODO: 유선형으로 보여줄 수 있도록 만들기

  render(index = null) {
    this.ctx.clearRect(
      0,
      0,
      store.state.canvasSize.width,
      store.state.canvasSize.height
    );
    let opacity = 1;
    if (!Object.is(index, null) && this.lineNumber !== index) {
      opacity = 0.3;
    }
    this.ctx.strokeStyle = this.color;
    this.ctx.globalAlpha = opacity;
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 0; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    this.ctx.stroke();

    //TODO: dot.js로 분리시킨 후 dot의 정보를 set 또는 object로 관리해 tooltip에서 사용할 수 있도록 만들 것
    //TODO: zIndex를 기반으로 정보의 순서를 저장하기.

    this.points.forEach((element, index) => {
      this.ctx.fillStyle = this.color;
      this.ctx.globalAlpha = opacity;
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
      this.ctx.globalAlpha = opacity;
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
    console.log(index, this.lineNumber);
  }
}
