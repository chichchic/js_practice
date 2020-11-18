import { Visual } from "./visual.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.visual = new Visual(
      this.canvas,
      [
        [3, 5, 3],
        [9, 0, 8],
        [19, 10, 23],
      ],
      ["#ff0000", "#00ff00", "#0000ff"],
      this.stageWidth,
      this.stageHeight
    );

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.canvas.style.width = this.stageWidth + "px";
    this.canvas.style.height = this.stageHeight + "px";

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 4;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.visual.animate(this.ctx);
  }
}

new App();

// 각 class를 실행시킬 때 전달해주어야 하는 값들에 대한 정의가 필요함
// chart.js UI를 조금 참고해도 좋을 듯
