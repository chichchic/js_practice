class BounceBall {
  constructor() {
    this.bounceBallSection = document.querySelector(".bounce-ball");
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.bounceBallSection.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    this.ball = new Ball(this.stageWidth, this.stageHeight, 30, 16);
    this.block = new Block(
      200,
      30,
      this.bounceBallSection.clientWidth / 2 - 100,
      this.bounceBallSection.clientHeight / 2 - 15
    );
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.bounceBallSection.clientWidth;
    this.stageHeight = this.bounceBallSection.clientHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = window.innerHeight / 2;
  }
  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.block.draw(this.ctx);
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
  }
}
new BounceBall();
