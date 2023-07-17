import { HEIGHT, WIDTH, isMobile } from "./Constants";

const message = isMobile ? "Tap to restart" : "Press space to restart";

export function drawGameOver(ctx: CanvasRenderingContext2D, score: number) {
  ctx.fillStyle = "black";

  ctx.font = "50px sans-serif";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game Over", WIDTH / 2, HEIGHT / 2 - 50);

  ctx.font = "30px sans-serif";
  ctx.fillText(`Score: ${score}`, WIDTH / 2, HEIGHT / 2);

  ctx.font = "20px sans-serif";
  ctx.fillText(message, WIDTH / 2, HEIGHT / 2 + 50);
}
