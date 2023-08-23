import { HEIGHT, WIDTH, isMobile } from "./Constants";
import { getDailyHighscore, getHighscore } from "./saveHighscore";

const restartMessage = isMobile ? "Tap to restart" : "Press space to restart";

const centerX = WIDTH / 2;
const centerY = HEIGHT / 2;

const xSpacing = 160;

export function drawGameOver(ctx: CanvasRenderingContext2D, score: number) {
  ctx.fillStyle = "black";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#111";

  ctx.font = "50px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("GAME OVER", centerX, centerY - 200);

  ctx.font = "26px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(`SCORE`, centerX - xSpacing, centerY - 100);
  ctx.textAlign = "right";
  ctx.fillText(`${score}`, centerX + xSpacing, centerY - 100);

  const dailyHighScore = getDailyHighscore();
  ctx.font = "26px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(`DAILY BEST`, centerX - xSpacing, centerY - 60);
  ctx.textAlign = "right";
  ctx.fillText(`${dailyHighScore}`, centerX + xSpacing, centerY - 60);

  const highScore = getHighscore();
  ctx.font = "26px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(`BEST`, centerX - xSpacing, centerY - 20);
  ctx.textAlign = "right";
  ctx.fillText(`${highScore}`, centerX + xSpacing, centerY - 20);

  ctx.textAlign = "center";
  ctx.font = "20px sans-serif";
  ctx.fillText(restartMessage, centerX, centerY + 100);
}
