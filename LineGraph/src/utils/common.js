export function makeCanvas(width, height, pixelRatio, zIndex) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.style.zIndex = 0;
  canvas.style.position = "absolute";

  ctx.scale(pixelRatio, pixelRatio);
  return { canvas, ctx };
}
