import store from "../../store/index.js";

import { makeCanvas } from "../../utils/common.js";
export default class Line {
  constructor(section, dataSet, zIndex, color) {
    this.color = color;
    this.points = [];

    Object.assign(
      this,
      makeCanvas(
        store.state.width,
        store.state.height,
        store.state.pixelRatio,
        zIndex * 2
      )
    );
    section.appendChild(this.canvas);

    let maxData = 0;

    dataSet.forEach((element, index) => {
      maxData = Math.max(element, maxData);
      this.points.push({
        x: index * store.state.xGap + store.state.padding.left,
        y: store.height + store.state.padding.top - element * store.state.yGap,
      });
    });
    if (!store.state.maxData || store.state.maxData < maxData) {
      store.commit("SET_MAX_DATA", maxData);
    }
  }

  render(ctx) {
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 0; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.stroke();
    this.points.forEach((element, index) => {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.points[index].x, this.points[index].y, 6, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(
        this.points[index].x + 80,
        this.points[index].y,
        3,
        6,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  }
}
