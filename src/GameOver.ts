import { HEIGHT, WIDTH, isMobile } from "./Constants";
import { getHighscore } from "./saveHighscore";

const restartMessage = isMobile ? "Tap to restart" : "Press space to restart";

const centerX = WIDTH / 2;
const centerY = HEIGHT / 2;

export function drawGameOver(ctx: CanvasRenderingContext2D, score: number) {
  ctx.fillStyle = "black";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#111";

  ctx.font = "50px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", centerX, centerY - 200);

  ctx.font = "30px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(`SCORE`, centerX - 100, centerY - 100);
  ctx.textAlign = "right";
  ctx.fillText(`${score}`, centerX + 100, centerY - 100);

  const highScore = getHighscore();
  if (highScore) {
    ctx.font = "30px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`BEST`, centerX - 100, centerY - 60);
    ctx.textAlign = "right";
    ctx.fillText(`${highScore}`, centerX + 100, centerY - 60);
  }

  ctx.textAlign = "center";
  ctx.font = "20px sans-serif";
  ctx.fillText(restartMessage, centerX, centerY + 100);
}
