import { WIDTH, HEIGHT, ASPECT_RATIO } from "./Constants";

export function createCanvas() {
  const canvas = document.createElement("canvas");

  // Makes it look sharper
  window.devicePixelRatio += 1;

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const windowAspectRatio = windowWidth / windowHeight;

  let canvasWidth = ASPECT_RATIO * windowHeight;
  let canvasHeight = windowHeight;

  // If the window is wider than the game
  if (windowAspectRatio < ASPECT_RATIO) {
    canvasWidth = windowWidth;
    canvasHeight = windowWidth / ASPECT_RATIO;
  }

  canvas.width = WIDTH * window.devicePixelRatio;
  canvas.height = HEIGHT * window.devicePixelRatio;

  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  document.body.appendChild(canvas);
  return canvas;
}
