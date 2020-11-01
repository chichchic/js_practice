class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;

    const diameter = this.radius * 2;
    this.x = radius + Math.random() * (stageWidth - diameter);
    this.y = radius + Math.random() * (stageHeight - diameter);
  }

  draw(ctx, stageWidth, stageHeight, block) {
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);
    this.bounceBlock(block);
    ctx.fillStyle = "#fdd700";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius + 2;
    const maxX = stageWidth - (this.radius + 2);
    const minY = this.radius + 2;
    const maxY = stageHeight - (this.radius + 2);

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx * 2;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy * 2;
    }
  }

  bounceBlock(block) {
    const minX = block.x - (this.radius + 2);
    const maxX = block.maxX + (this.radius + 2);
    const minY = block.y - (this.radius + 2);
    const maxY = block.maxY + (this.radius + 2);

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.x - maxY);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if (min == min1) {
        this.vx *= -1;
        this.x += this.vx * 2;
      } else {
        this.vy *= -1;
        this.y += this.vy * 2;
      }
    }
  }
}
