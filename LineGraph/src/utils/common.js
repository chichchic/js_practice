import store from "../store/index.js";

export function makeCanvas(width, height, zIndex, top = 0, left = 0) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width * store.state.pixelRatio;
  canvas.height = height * store.state.pixelRatio;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.style.zIndex = zIndex;
  canvas.style.position = "absolute";
  canvas.style.top = top + "px";
  canvas.style.left = left + "px";

  ctx.scale(store.state.pixelRatio, store.state.pixelRatio);
  return { canvas, ctx };
}

export function distance(x1, y1, x2, y2) {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function pointCircle(px, py, cx, cy, r) {
  if (distance(px, py, cx, cy) <= r) return true;
  return false;
}
