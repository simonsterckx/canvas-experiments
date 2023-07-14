import { WIDTH, HEIGHT } from "./Constants";

export function createCanvas() {
  const canvas = document.createElement("canvas");

  // Makes it look sharper
  window.devicePixelRatio += 1;

  canvas.width = WIDTH * window.devicePixelRatio;
  canvas.height = HEIGHT * window.devicePixelRatio;
  canvas.style.width = WIDTH + "px";
  canvas.style.height = HEIGHT + "px";
  document.body.appendChild(canvas);
  return canvas;
}
