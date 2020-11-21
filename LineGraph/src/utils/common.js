import store from "../store/index.js";

export function makeCanvas(width, height, zIndex) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width * store.state.pixelRatio;
  canvas.height = height * store.state.pixelRatio;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  canvas.style.zIndex = zIndex;
  canvas.style.position = "absolute";

  ctx.scale(store.state.pixelRatio, store.state.pixelRatio);
  return { canvas, ctx };
}
