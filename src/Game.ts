import { HEIGHT, WIDTH } from "./Constants";
import { FoodController } from "./FoodController";
import { drawGameOver } from "./GameOver";
import { Player } from "./Player";
import { createCanvas } from "./createCanvas";
import "./index.css";
import {
  downPressed,
  leftPressed,
  resetKeys,
  rightPressed,
  spacePressed,
  upPressed,
} from "./upPressed";

const canvas = createCanvas();
const ctx = canvas.getContext("2d")!;

export class Game {
  player = new Player();
  foodController = new FoodController(this);
  gameOver: boolean = false;

  start() {
    this.reset();
    window.requestAnimationFrame(this.gameLoop);
  }

  reset() {
    this.player.reset();
    this.foodController.reset();
    resetKeys();
  }

  handleCollision() {
    this.gameOver = true;
  }

  gameLoop = () => {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.gameLoop);
  };

  update() {
    this.player.update(
      leftPressed ? -1 : rightPressed ? 1 : 0,
      upPressed ? -1 : downPressed ? 1 : 0
    );
    this.foodController.update();

    if (this.gameOver) {
      if (spacePressed) {
        this.gameOver = false;
        this.reset();
      }
    }
  }

  draw() {
    this.clearCanvas();

    if (this.gameOver) {
      drawGameOver(ctx, this.foodController.foodScore);
    } else {
      this.player.draw(ctx);
    }

    this.foodController.draw(ctx);
  }

  clearCanvas() {
    ctx.resetTransform();
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.fillStyle = "hsla(169, 59.8%, 80.0%, 0.4)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}
