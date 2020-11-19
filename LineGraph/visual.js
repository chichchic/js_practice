import { Line } from "./line.js";

export class Visual {
  constructor(canvas, dataSet, colors, stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.lines = [];
    this.minVal = dataSet[0][0];
    this.maxVal = dataSet[0][0];
    dataSet.forEach((element, index) => {
      let minVal = Math.min(...element);
      let maxVal = Math.max(...element);
      this.minVal = this.minVal > minVal ? minVal : this.minVal;
      this.maxVal = this.maxVal < maxVal ? maxVal : this.maxVal;

      this.lines.push(
        new Line(canvas, element, colors[index], stageWidth, stageHeight)
      );
    });
    console.log(this.maxVal, this.minVal);
  }

  //최소 높이 this.stageHeight - 80
  //최대 높이 130
  //총 높이 this.stageHeight - 210
  animate(ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#a0a0a0";
    ctx.beginPath();
    ctx.moveTo(80, 130);
    ctx.lineTo(80, this.stageHeight - 70);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(70, this.stageHeight - 80);
    ctx.lineTo(this.stageWidth, this.stageHeight - 80);
    ctx.stroke();
    ctx.font = "15px serif";
    ctx.textBaseline = "middle";
    const yGap = (this.stageHeight - 210) / 23;
    for (let i = 0; i < 24; i++) {
      ctx.fillText(i, 60, this.stageHeight - 80 - yGap * i);
      ctx.beginPath();
      ctx.moveTo(75, this.stageHeight - 80 - yGap * i);
      ctx.lineTo(this.stageWidth, this.stageHeight - 80 - yGap * i);
      ctx.stroke();
    }

    // this.lines.forEach((element) => {
    //   element.animate(ctx);
    // });
  }
}
// 그리드와 선들을 그려주는 역할을 수행
// 마우스 오버시 다른 선들의 색상을 연하게 만들어야함
//x축과 y축에 숫자도 표현
// legend를 만들어주는 class를 따로 만들면 좋을것 같음
