export function drawStraight(
  ctx,
  startX,
  startY,
  endX,
  endY,
  lineWidth = 1,
  strokeColor = "#a0a0a0"
) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeColor;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}
