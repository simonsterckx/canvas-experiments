import { Food } from "./Food";
import { Game } from "./Game";
import { Player } from "./Player";

export class FoodController {
  readonly foods: Food[] = [];
  foodScore = 0;

  player: Player;

  constructor(public game: Game) {
    this.player = game.player;
    this.reset();
  }

  reset() {
    this.foodScore = 0;

    this.foods.length = 0;
    this.createFood();
    this.createFood();
    this.createFood();
    this.createFood();
    this.createFood();
  }

  createFood() {
    const food = new Food(this.player);
    this.foods.push(food);
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.foods.forEach((food) => food.draw(ctx));
    this.drawFoodCount(ctx);
  }

  update() {
    this.foods.forEach((food) => {
      food.update();
      if (this.player.collidesWith(food)) {
        if (food.size < this.player.size) {
          this.foodScore++;
          do {
            food.reset(this.player);
          } while (!this.hasAtLeastOneAvailableFood());

          this.player.grow();
        } else {
          this.game.handleCollision();
        }
      }
    });
  }

  hasAtLeastOneAvailableFood() {
    return this.foods.some((food) => this.player.size > food.size);
  }

  drawFoodCount(ctx: CanvasRenderingContext2D) {
    ctx.font = "18px sans-serif";
    ctx.fillStyle = "#222";
    ctx.fillText(`Food: ${this.foodScore}`, 10, 20);
  }
}
