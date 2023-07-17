import { HEIGHT, WIDTH, isMobile } from "./Constants";
import { FoodController } from "./FoodController";
import { drawGameOver } from "./GameOver";
import { KeyboardController } from "./KeyboardController";
import { Player } from "./Player";
import { VirtualJoystick } from "./VirtualJoystick";
import { createCanvas } from "./createCanvas";
import "./index.css";
import { saveHighscore } from "./saveHighscore";

const canvas = createCanvas();
const ctx = canvas.getContext("2d")!;

export class Game {
  player = new Player();
  foodController = new FoodController(this);
  gameOver: boolean = false;
  keyboardController = new KeyboardController(canvas);
  joystick = new VirtualJoystick();

  start() {
    this.reset();
    window.requestAnimationFrame(this.gameLoop);
  }

  reset() {
    this.gameOver = false;
    this.player.reset();
    this.foodController.reset();
    this.keyboardController.reset();
  }

  handleCollision() {
    this.gameOver = true;
    // save score
    const score = this.foodController.foodScore;
    saveHighscore(score);
    const touchListener = (e: TouchEvent) => {
      e.preventDefault();
      this.reset();
      canvas.removeEventListener("touchstart", touchListener);
    };
    canvas.addEventListener("touchstart", touchListener);

    const keyListener = (e: KeyboardEvent) => {
      if (e.key === " ") {
        this.reset();
        window.removeEventListener("keydown", keyListener);
      }
    };
    window.addEventListener("keydown", keyListener);
  }

  gameLoop = () => {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.gameLoop);
  };

  update() {
    let horizontalMovement = 0;
    let verticalMovement = 0;
    if (isMobile) {
      horizontalMovement = this.joystick.x;
      verticalMovement = this.joystick.y;
    } else {
      horizontalMovement = this.keyboardController.horizontalMovement;
      verticalMovement = this.keyboardController.verticalMovement;
    }

    this.player.update(horizontalMovement, verticalMovement);
    this.foodController.update();
  }

  draw() {
    this.clearCanvas();

    this.foodController.draw(ctx);

    if (this.gameOver) {
      drawGameOver(ctx, this.foodController.foodScore);
    } else {
      this.player.draw(ctx);
    }
  }

  clearCanvas() {
    ctx.resetTransform();
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.fillStyle = "hsla(169, 59.8%, 80.0%, 0.4)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
}
