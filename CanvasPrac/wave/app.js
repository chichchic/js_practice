class Waves {
  constructor() {
    this.waves = document.querySelector(".waves");
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.waves.appendChild(this.canvas);

    this.waveGroup = new WaveGroup();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    console.log("resize");
    this.stageWidth = this.waves.clientWidth;
    this.stageHeight = this.waves.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.waveGroup.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.waveGroup.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

new Waves();
