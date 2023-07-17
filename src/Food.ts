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
  eyeDirection: any;

  constructor(public player: Player) {
    this.reset();
  }
  reset() {
    this.color = `hsl(${Math.random() * 360}, 80%, 50%)`;
    do {
      this.x = Math.random() * (WIDTH - 100) + 100;
      this.y = Math.random() * (HEIGHT - 100) + 100;
    } while (this.player.distanceTo(this) < 200 + this.player.size);

    this.direction = Math.random() * Math.PI * 2;
    this.eyeDirection = this.direction;
    this.speed = Math.random() * 5 + 1;

    // food size is random but based to player size
    this.size = this.player.size / 2 + Math.random() * this.player.size;

    // speed is related to size. bigger food is slower
    this.speed -= this.size / 10;
  }

  update() {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    // wrap around the screen
    this.x = ((this.x % WIDTH) + WIDTH) % WIDTH;
    this.y = ((this.y % HEIGHT) + HEIGHT) % HEIGHT;

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

    // Tween based on direction to make smooth changes
    this.eyeDirection = this.eyeDirection * 0.9 + this.direction * 0.1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "hsl(135 39.6% 19.1%)";
    ctx.stroke();

    // Add an eye looking in the direction of movement
    ctx.beginPath();
    ctx.arc(
      this.x + Math.cos(this.eyeDirection) * this.size * 0.3,
      this.y + Math.sin(this.eyeDirection) * this.size * 0.3,
      this.size * 0.2,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fill();
    ctx.closePath();

    // Add a pupil looking in the direction of movement
    ctx.beginPath();
    ctx.arc(
      this.x + Math.cos(this.eyeDirection) * this.size * 0.3,
      this.y + Math.sin(this.eyeDirection) * this.size * 0.3,
      this.size * 0.1,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fill();
    ctx.closePath();
  }
}
