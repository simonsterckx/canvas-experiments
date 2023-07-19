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
    while (!this.hasAtLeastOneAvailableFood()) {
      this.foods[0].reset();
    }
  }

  createFood() {
    const food = new Food(this.player);
    this.foods.push(food);
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.foods.forEach((food) => food.draw(ctx));
    this.drawFoodCount(ctx);
  }

  update(delta: number) {
    this.foods.forEach((food) => {
      food.update(delta);
      if (this.game.gameOver) {
        return;
      }
      if (food.distanceToPlayer() <= 0) {
        if (this.player.size >= food.size) {
          this.foodScore++;
          do {
            food.reset();
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
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${this.foodScore}`, 10, 20);
  }
}
