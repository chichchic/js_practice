import store from "../../store/index.js";
import { drawStraight } from "../../utils/line.js";
import { makeCanvas } from "../../utils/common.js";
export default class Grid {
  constructor(section) {
    Object.assign(
      this,
      makeCanvas(
        store.state.canvasSize.width,
        store.state.canvasSize.height,
        store.state.pixelRatio,
        0
      )
    );
    section.appendChild(this.canvas);
  }
  render() {
    let { top, right, bottom, left } = store.state.padding;
    let { x: xGap, y: yGap } = store.state.gap;
    const yBaseLine = store.state.canvasSize.height - bottom;

    // draw x-axis base line
    drawStraight(
      this.ctx,
      left,
      yBaseLine,
      store.state.canvasSize.width - right,
      yBaseLine
    );
    // draw y-axis base line
    drawStraight(this.ctx, left, top, left, yBaseLine);

    this.ctx.font = "15px serif";
    this.ctx.textBaseline = "middle";
    // draw x-axis
    store.state.yLabels.forEach((val, index) => {
      this.ctx.fillText(val, left - 30, yBaseLine - yGap * index);
      drawStraight(
        this.ctx,
        left,
        yBaseLine - yGap * index,
        store.state.canvasSize.width,
        yBaseLine - yGap * index
      );
    });
    this.ctx.textBaseline = "top";
    store.state.xLabels.forEach((val, index) => {
      this.ctx.fillText(val, left + xGap * index - 4, yBaseLine + 10);
      drawStraight(
        this.ctx,
        left + xGap * index,
        top,
        left + xGap * index,
        yBaseLine
      );
    });
  }
}
