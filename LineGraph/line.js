export class Line {
  constructor(canvas, dataSet) {
    this.points = [];
    const gap = (canvas.width - 100) / dataSet.length;
    this.maxY = 0;

    dataSet.forEach((element, index) => {
      this.maxY = this.maxY < element ? element : this.maxY;
      console.log(canvas.height);
      this.points.push({
        x: (index + 1) * gap,
        y: canvas.height - element * 100,
      });
    });
    this.maxY - 10;
  }

  animate(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "#ff0000";
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 0; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.stroke();
    // ctx.beginPath();
    // ctx.fillStyle = "#ffffff";
    // this.points.forEach((element) => {
    //   ctx.arc(element.x, element.y, 6, 0, Math.PI * 2);
    //   ctx.fill();
    // });
  }
}

// 선 그려주는 기능
// 전체 넓이에 맞게 자동으로 그래프의 gap을 조정하도록 해야함
