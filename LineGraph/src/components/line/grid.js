import store from "../../store/index.js";
import { drawStraight } from "../../utils/draw.js";
import { makeCanvas } from "../../utils/common.js";

//TODO: 음수가 나올 경우 아래쪽으로 grid 만들어주기

function makeDefaultAxes(axes) {
  let defaultAxes = {
    display: true,
    scaleLabel: {
      display: false,
      labelString: "",
    },
  };
  if (!axes) return defaultAxes;
  return Object.assign(defaultAxes, axes);
}

export default class Grid {
  constructor(section, scales = { xAxes, yAxes }) {
    this.xAxes = makeDefaultAxes(scales.xAxes);
    this.yAxes = makeDefaultAxes(scales.yAxes);

    Object.assign(
      this,
      makeCanvas(store.state.canvasSize.width, store.state.canvasSize.height, 0)
    );
    section.appendChild(this.canvas);
  }
  render() {
    const { width: canvasWidth, height: canvasHeight } = store.state.canvasSize;
    if (this.xAxes.scaleLabel.display) {
      this.drawXAxesLabel(canvasWidth, canvasHeight);
    }
    if (this.yAxes.scaleLabel.display) {
      this.drawYAxesLabel(canvasWidth, canvasHeight);
    }

    //XXX: 변경된 padding값에 맞춰 draw되도록 하기 위해 반복된 if를 사용
    if (this.xAxes.display) {
      store.commit("ADD_PADDING", { bottom: 50 });
    }
    if (this.yAxes.display) {
      store.commit("ADD_PADDING", { left: 50 });
    }
    if (this.xAxes.display) {
      this.drawXAxes(canvasWidth, canvasHeight);
    }
    if (this.yAxes.display) {
      this.drawYAxes(canvasWidth, canvasHeight);
    }

    // draw x-axis base line

    // // draw y-axis base line
    // drawStraight(this.ctx, left, top, left, yBaseLine);

    // this.ctx.font = "15px serif";
    // this.ctx.textBaseline = "middle";
    // // draw x-axis
    // store.state.yLabels.forEach((val, index) => {
    //
    //   drawStraight(
    //     this.ctx,
    //     left,
    //     yBaseLine - yGap * index,
    //     store.state.canvasSize.width,
    //     yBaseLine - yGap * index
    //   );
    // });
    //
    // store.state.xLabels.forEach((val, index) => {
    //
    //   drawStraight(
    //     this.ctx,
    //     left + xGap * index,
    //     top,
    //     left + xGap * index,
    //     yBaseLine
    //   );
    // });
  }

  drawXAxesLabel(canvasWidth, canvasHeight) {
    const { top, right, bottom, left } = store.state.padding;
    if (this.xAxes.scaleLabel.display) {
      this.ctx.fillStyle = "#000000";
      this.ctx.font = "20px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "top";
      this.ctx.fillText(
        this.xAxes.scaleLabel.labelString,
        canvasWidth / 2,
        canvasHeight - bottom - 20
      );
      store.commit("ADD_PADDING", { bottom: 25 });
    }
  }
  drawYAxesLabel(canvasWidth, canvasHeight) {
    const { top, right, bottom, left } = store.state.padding;
    if (this.yAxes.scaleLabel.display) {
      this.ctx.fillStyle = "#000000";
      this.ctx.font = "20px Arial";
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "top";
      this.ctx.save();
      this.ctx.translate(0, canvasHeight / 2);
      this.ctx.rotate(-Math.PI / 2);
      this.ctx.fillText(this.yAxes.scaleLabel.labelString, 0, 0);
      this.ctx.restore();
      store.commit("ADD_PADDING", { left: 25 });
    }
  }
  // 조금 튀어 나온 부분 변수로 관리하기
  drawXAxes(canvasWidth, canvasHeight) {
    const { top, right, bottom, left } = store.state.padding;
    console.log(store.state.hasNegative);
    const xBaseLine = store.state.hasNegative
      ? (canvasHeight - bottom + top) / 2
      : canvasHeight - bottom;
    const gap = store.state.hasNegative
      ? (canvasHeight - bottom - top) / store.state.unitCount / 2
      : (canvasHeight - bottom - top) / store.state.unitCount;
    this.ctx.font = "15px Arial";
    this.ctx.textBaseline = "middle";
    for (let i = 0; i <= store.state.unitCount; i++) {
      const color = i === 0 ? "#333333" : "#a0a0a0";
      const lineWidth = i === 0 ? 2 : 1;
      drawStraight(
        this.ctx,
        left - 20,
        xBaseLine - gap * i,
        canvasWidth - right,
        xBaseLine - gap * i,
        lineWidth,
        color
      );
      this.ctx.fillText(store.state.unit * i, left - 30, xBaseLine - gap * i);
    }
    if (store.state.hasNegative) {
      for (let i = 1; i <= store.state.unitCount; i++) {
        drawStraight(
          this.ctx,
          left - 20,
          xBaseLine + gap * i,
          canvasWidth - right,
          xBaseLine + gap * i,
          1,
          "#a0a0a0"
        );
        this.ctx.fillText(
          -store.state.unit * i,
          left - 30,
          xBaseLine + gap * i
        );
      }
    }
  }
  drawYAxes(canvasWidth, canvasHeight) {
    const { top, right, bottom, left } = store.state.padding;
    for (let i = 0; i <= store.state.dataLength; i++) {
      const color = i === 0 ? "#333333" : "#a0a0a0";
      const lineWidth = i === 0 ? 2 : 1;
      drawStraight(
        this.ctx,
        left + store.state.xGap * i,
        top - 10,
        left + store.state.xGap * i,
        canvasHeight - bottom + 10,
        lineWidth,
        color
      );
      this.ctx.font = "15px Arial";
      this.ctx.textBaseline = "top";
      this.ctx.fillText(
        store.state.labels[i],
        left + store.state.xGap * i,
        canvasHeight - bottom + 20
      );
    }
  }
}
