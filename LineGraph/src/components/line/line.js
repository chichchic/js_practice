import store from "../../store/index.js";

import { makeCanvas } from "../../utils/common.js";

//명시되지 않은 값은 mutation에서 기본 값으로 처리, data에 대한 예외처리도 되어있음
export default class Line {
  constructor(
    section,
    lineNumber,
    { label, backgroundColor, borderColor, data, fill }
  ) {
    this.lineNumber;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.fill = fill;
    this.points = [];

    Object.assign(
      this,
      makeCanvas(
        store.state.canvasSize.width,
        store.state.canvasSize.height,
        (lineNumber + 1) * 2
      )
    );
    section.appendChild(this.canvas);

    const { top, right, bottom, left } = store.state.padding;
    const { width: canvasWidth, height: canvasHeight } = store.state.canvasSize;

    const xBaseLine = store.state.hasNegative
      ? (canvasHeight - bottom + top) / 2
      : canvasHeight - bottom;
    const gap = store.state.hasNegative
      ? (canvasHeight - bottom - top) / store.state.unitCount / 2
      : (canvasHeight - bottom - top) / store.state.unitCount;
    data.forEach((value, index) => {
      const dot = {
        x: index * store.state.xGap + left,
        y: xBaseLine - (value / store.state.unit) * gap,
      };
      this.points.push(dot);
      store.commit("ADD_DOT_POINTS_DATA", {
        ...dot,
        title: store.state.labels[index],
        lineNumber: lineNumber,
        zIndex: (lineNumber + 1) * 2,
        xDataset: {
          borderColor,
          backgroundColor,
          label,
          value,
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
    this.ctx.strokeStyle = this.borderColor;
    this.ctx.globalAlpha = opacity;
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 0; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    this.ctx.stroke();

    this.points.forEach((element, index) => {
      this.ctx.fillStyle = this.borderColor;
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
  }
}
