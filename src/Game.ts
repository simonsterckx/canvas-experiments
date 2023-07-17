import { HEIGHT, WIDTH, isMobile } from "./Constants";
import { FoodController } from "./FoodController";
import { drawGameOver } from "./GameOver";
import { MovementController } from "./MovementController";
import { Player } from "./Player";
import { VirtualJoystick } from "./VirtualJoystick";
import { createCanvas } from "./createCanvas";
import "./index.css";

const canvas = createCanvas();
const ctx = canvas.getContext("2d")!;

export class Game {
  player = new Player();
  foodController = new FoodController(this);
  gameOver: boolean = false;
  movementController = new MovementController(canvas);
  joystick = new VirtualJoystick();

  start() {
    this.reset();
    window.requestAnimationFrame(this.gameLoop);
  }

  reset() {
    this.gameOver = false;
    this.player.reset();
    this.foodController.reset();
    this.movementController.reset();
  }

  handleCollision() {
    this.gameOver = true;
    const eventListener = (e: TouchEvent) => {
      e.preventDefault();
      this.reset();
      canvas.removeEventListener("touchstart", eventListener);
    };
    canvas.addEventListener("touchstart", eventListener);
  }

  gameLoop = () => {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.gameLoop);
  };

  update() {
    let horizontalMovement = this.movementController.horizontalMovement;
    let verticalMovement = this.movementController.verticalMovement;
    if (isMobile) {
      horizontalMovement = this.joystick.x;
      verticalMovement = this.joystick.y;
    }
    this.player.update(horizontalMovement, verticalMovement);
    this.foodController.update();

    if (this.gameOver) {
      if (this.movementController.spacePressed) {
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
