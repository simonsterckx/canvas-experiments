import { HEIGHT, WIDTH } from "./Constants";
import { FoodController } from "./FoodController";
import { drawGameOver } from "./GameOver";
import { Player } from "./Player";
import { VirtualJoystick } from "./VirtualJoystick";
import { createCanvas } from "./createCanvas";
import "./index.css";
import { saveHighscore } from "./saveHighscore";

export class Game {
  player = new Player();
  foodController = new FoodController(this);
  gameOver: boolean = false;
  joystick = new VirtualJoystick();
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  start() {
    this.canvas = createCanvas();
    this.ctx = this.canvas.getContext("2d")!;
    this.restartGame();
    window.requestAnimationFrame(this.gameLoop);
  }

  restartGame() {
    this.gameOver = false;
    this.player.reset();
    this.foodController.reset();
    this.joystick.reset();
  }

  handleCollision() {
    this.gameOver = true;
    // save score
    const score = this.foodController.foodScore;
    saveHighscore(score);

    const touchListener = (e: TouchEvent | MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      this.restartGame();
      this.canvas.removeEventListener("touchstart", touchListener);
      this.canvas.removeEventListener("mousedown", touchListener);
    };
    this.canvas.addEventListener("mousedown", touchListener);
    this.canvas.addEventListener("touchstart", touchListener);
  }

  gameLoop = () => {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.gameLoop);
  };

  update() {
    const horizontalMovement = this.joystick.x;
    const verticalMovement = this.joystick.y;

    this.player.update(horizontalMovement, verticalMovement);
    this.foodController.update();
  }

  draw() {
    this.clearCanvas();

    this.foodController.draw(this.ctx);

    if (this.gameOver) {
      this.joystick.disabled = true;
      drawGameOver(this.ctx, this.foodController.foodScore);
    } else {
      this.player.draw(this.ctx);
    }
  }

  clearCanvas() {
    this.ctx.resetTransform();
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    this.ctx.fillStyle = "hsla(169, 59.8%, 80.0%, 0.4)";
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}
