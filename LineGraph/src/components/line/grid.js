import store from "../../store/index.js";
import { drawStraight } from "../../utils/draw.js";
import { makeCanvas } from "../../utils/common.js";

function drawXAxesLabel(ctx, xAxes, canvasWidth, canvasHeight) {
  const { top, right, bottom, left } = store.state.padding;
  if (xAxes.scaleLabel.display) {
    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(
      xAxes.scaleLabel.labelString,
      canvasWidth / 2,
      canvasHeight - 20
    );
  }
}

function drawYAxesLabel(ctx, yAxes, canvasWidth, canvasHeight) {
  const { top, right, bottom, left } = store.state.padding;
  if (yAxes.scaleLabel.display) {
    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.save();
    ctx.translate(0, canvasHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yAxes.scaleLabel.labelString, 0, 0);
    ctx.restore();
  }
}
// 조금 튀어 나온 부분 변수로 관리하기
function drawXAxes(ctx, canvasWidth, canvasHeight) {
  const { top, right, bottom, left } = store.state.padding;
  const xBaseLine = store.state.hasNegative
    ? (canvasHeight - bottom + top) / 2
    : canvasHeight - bottom;

  const gap = store.state.hasNegative
    ? (canvasHeight - bottom - top) / store.state.unitCount / 2
    : (canvasHeight - bottom - top) / store.state.unitCount;
  ctx.font = "15px Arial";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let i = 0; i <= store.state.unitCount; i++) {
    const color = i === 0 ? "#333333" : "#a0a0a0";
    const lineWidth = i === 0 ? 2 : 1;
    drawStraight(
      ctx,
      left - 20,
      xBaseLine - gap * i,
      canvasWidth - right,
      xBaseLine - gap * i,
      lineWidth,
      color
    );
    ctx.fillText(store.state.unit * i, left - 30, xBaseLine - gap * i);
  }
  if (store.state.hasNegative) {
    for (let i = 1; i <= store.state.unitCount; i++) {
      drawStraight(
        ctx,
        left - 20,
        xBaseLine + gap * i,
        canvasWidth - right,
        xBaseLine + gap * i,
        1,
        "#a0a0a0"
      );
      ctx.fillText(-store.state.unit * i, left - 30, xBaseLine + gap * i);
    }
  }
}

function drawYAxes(ctx, canvasWidth, canvasHeight) {
  const { top, right, bottom, left } = store.state.padding;
  for (let i = 0; i <= store.state.dataLength; i++) {
    const color = i === 0 ? "#333333" : "#a0a0a0";
    const lineWidth = i === 0 ? 2 : 1;
    drawStraight(
      ctx,
      left + store.state.xGap * i,
      top - 10,
      left + store.state.xGap * i,
      canvasHeight - bottom + 10,
      lineWidth,
      color
    );
    ctx.font = "15px Arial";
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(
      store.state.labels[i],
      left + store.state.xGap * i,
      canvasHeight - bottom + 20
    );
  }
}

export default class Grid {
  constructor(section, scales = { xAxes, yAxes }) {
    this.xAxes = scales.xAxes;
    this.yAxes = scales.yAxes;
    Object.assign(
      this,
      makeCanvas(store.state.canvasSize.width, store.state.canvasSize.height, 0)
    );
    section.appendChild(this.canvas);
  }
  render() {
    const { width: canvasWidth, height: canvasHeight } = store.state.canvasSize;

    if (this.xAxes.scaleLabel.display) {
      drawXAxesLabel(this.ctx, this.xAxes, canvasWidth, canvasHeight);
    }
    if (this.yAxes.scaleLabel.display) {
      drawYAxesLabel(this.ctx, this.yAxes, canvasWidth, canvasHeight);
    }

    if (this.xAxes.display) {
      drawXAxes(this.ctx, canvasWidth, canvasHeight);
    }
    if (this.yAxes.display) {
      drawYAxes(this.ctx, canvasWidth, canvasHeight);
    }
  }
}
