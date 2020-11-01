const COLORS = [
  { r: 45, g: 74, b: 227 },
  { r: 250, g: 255, b: 89 },
  { r: 255, g: 104, b: 248 },
  { r: 44, g: 209, b: 252 },
  { r: 54, g: 233, b: 84 },
];

class GlowingBackground {
  constructor() {
    this.glowingBackground = document.querySelector(".glowing-background");
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.glowingBackground.appendChild(this.canvas);

    this.totalParticles = 15;
    this.particles = [];
    this.maxRadius = 450;
    this.minRadius = 400;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.glowingBackground.clientWidth;
    this.stageHeight = this.glowingBackground.clientHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;

    this.ctx.globalCompositeOperation = "saturation";

    this.createParticles();
  }

  createParticles() {
    let curColor = 0;
    this.particles = [];

    for (let i = 0; i < this.totalParticles; i++) {
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        COLORS[curColor]
      );

      if (++curColor >= COLORS.length) {
        curColor = 0;
      }

      this.particles[i] = item;
    }
  }

  animate(t) {
    requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.totalParticles; i++) {
      const item = this.particles[i];
      item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  }
}
new GlowingBackground();
