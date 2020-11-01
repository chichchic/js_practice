class RotatePolygon {
  constructor() {
    this.rotatePolygon = document.querySelector(".rotate-polygon");
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.rotatePolygon.appendChild(this.canvas);

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    document.addEventListener("pointerdown", this.onDown.bind(this), false);
    document.addEventListener("pointermove", this.onMove.bind(this), false);
    document.addEventListener("pointerup", this.onUp.bind(this), false);

    this.isDown = false;
    this.moveX = 0;
    this.offsetX = 0;

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.rotatePolygon.clientWidth;
    this.stageHeight = this.rotatePolygon.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.polygon = new Polygon(
      this.stageWidth / 2,
      this.stageHeight / 2,
      this.stageHeight / 3,
      3
    );
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.moveX *= 0.92;

    this.polygon.animate(this.ctx, this.moveX);
  }

  onDown(e) {
    this.isDown = true;
    this.moveX = 0;
    this.offsetX = e.clientX;
    console.log(e.clientX);
  }
  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
  }
  onUp(e) {
    console.log(e.clientX);
    this.isDown = false;
  }
}
new RotatePolygon();
