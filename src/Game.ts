import { WIDTH, HEIGHT } from "./Constants";
import { Food } from "./Food";
import { Player } from "./Player";
import { createCanvas } from "./createCanvas";
import "./index.css";
import {
  upPressed,
  downPressed,
  leftPressed,
  rightPressed,
  resetKeys,
} from "./upPressed";

const canvas = createCanvas();
const ctx = canvas.getContext("2d")!;

const player = new Player();

const foods: Food[] = [];

let foodScore = 0;

function createFood() {
  const food = new Food(player);
  foods.push(food);
}

export class Game {
  draw() {
    this.clearCanvas();

    player.draw(ctx);
    foods.forEach((food) => food.draw(ctx));
    this.drawFoodCount();
  }

  update() {
    player.update(
      leftPressed ? -1 : rightPressed ? 1 : 0,
      upPressed ? -1 : downPressed ? 1 : 0
    );
    foods.forEach((food) => {
      food.update();
      if (player.collidesWith(food)) {
        if (food.size < player.size) {
          foodScore++;
          food.reset(player);
          player.grow();
        } else {
          window.alert("Game Over");
          this.restart();
        }
      }
    });
  }

  gameLoop = () => {
    this.update();
    this.draw();
    window.requestAnimationFrame(this.gameLoop);
  };
  start() {
    this.restart();
    window.requestAnimationFrame(this.gameLoop);
  }

  restart() {
    foodScore = 0;
    player.size = 50;
    foods.length = 0;
    createFood();
    createFood();
    createFood();
    createFood();
    createFood();
    resetKeys();
  }

  clearCanvas() {
    ctx.resetTransform();
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.fillStyle = "hsla(169, 59.8%, 94.0%, 0.4)";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }
  drawFoodCount() {
    ctx.font = "18px sans-serif";
    ctx.fillStyle = "#222";
    ctx.fillText(`Food: ${foodScore}`, 10, 20);
  }
}
