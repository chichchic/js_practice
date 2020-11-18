import { Line } from "./line.js";

export class Visual {
  constructor(canvas, dataSet, colors, stageWidth, stageHeight) {
    this.lines = [];
    dataSet.forEach((element, index) => {
      this.lines.push(
        new Line(canvas, element, colors[index], stageWidth, stageHeight)
      );
    });
  }

  animate(ctx) {
    this.lines.forEach((element) => {
      element.animate(ctx);
    });
  }
}
// 그리드와 선들을 그려주는 역할을 수행
// 마우스 오버시 다른 선들의 색상을 연하게 만들어야함
//x축과 y축에 숫자도 표현
// legend를 만들어주는 class를 따로 만들면 좋을것 같음
