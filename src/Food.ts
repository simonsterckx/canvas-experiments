import { HEIGHT, WIDTH } from "./Constants";
import { Player } from "./Player";

const MAX_SPEED = 10;
export class Food {
  x = 0;
  y = 0;
  size = 10;
  speed = 2;
  direction = 0;
  color = "green";

  constructor(player: Player) {
    this.reset(player);
  }
  reset(player: Player) {
    this.color = `hsl(${Math.random() * 360}, 80%, 50%)`;
    do {
      this.x = Math.random() * (WIDTH - 100) + 100;
      this.y = Math.random() * (HEIGHT - 100) + 100;
    } while (player.distanceTo(this) < 200 + player.size);

    this.direction = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 5 + 1;

    // food size is random but based to player size
    this.size = Math.random() * player.size + player.size / 2;
  }

  update() {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    // 30% chance to change direction slightly
    if (Math.random() < 0.3) {
      this.direction += Math.random() * 0.5 - 0.25;
    }

    // 5% chance to change direction a lot
    if (Math.random() < 0.05) {
      this.direction += Math.random() * 2 - 1;
    }

    // 30% chance to change speed slightly
    if (Math.random() < 0.3) {
      this.speed += Math.random() * 0.5 - 0.25;
      if (this.speed < 1) this.speed = 1;
      if (this.speed > MAX_SPEED) this.speed = MAX_SPEED;
    }
  }

  drawFood(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "hsl(135 39.6% 19.1%)";
    ctx.stroke();
  }

  draw(ctx: CanvasRenderingContext2D) {
    let x1 = ((this.x % WIDTH) + WIDTH) % WIDTH;
    let y1 = ((this.y % HEIGHT) + HEIGHT) % HEIGHT;
    this.x = x1;
    this.y = y1;
    let x2 = x1 + this.size;
    let y2 = y1 + this.size;
    this.drawFood(ctx);

    // check if touching right side
    if (x2 > WIDTH) {
      this.drawFood(ctx); // draw left copy

      // check if touching bottom
      if (y2 > HEIGHT) {
        this.drawFood(ctx); // draw top copy
      }
    }

    if (y2 > HEIGHT) {
      this.drawFood(ctx);
    }
  }
}
