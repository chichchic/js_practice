export class Line {
  constructor(canvas, dataSet, color = "#000000", stageWidth, stageHeight) {
    this.color = color;
    this.points = [];
    const gap = stageWidth / (dataSet.length - 1);
    this.maxY = 0;

    dataSet.forEach((element, index) => {
      this.maxY = this.maxY < element ? element : this.maxY;
      this.points.push({
        x: index * gap,
        y: stageHeight - element * 20,
      });
    });
    this.maxY - 10;
  }

  animate(ctx) {
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 0; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.stroke();
    // ctx.fillStyle = this.color;
    // this.points.forEach((element) => {
    //   ctx.beginPath();
    //   ctx.arc(element.x, element.y, 6, 0, Math.PI * 2);
    //   ctx.fill();
    // });
  }
}

// 선 그려주는 기능
// 전체 넓이에 맞게 자동으로 그래프의 gap을 조정하도록 해야함
