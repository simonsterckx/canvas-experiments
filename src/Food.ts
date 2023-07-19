import { HEIGHT, WIDTH } from "./Constants";
import { Player } from "./Player";
import { interpolate } from "./interpolate";

const MAX_SPEED = 7;
const MIN_SPEED = 1;
export class Food {
  x = 0;
  y = 0;
  size = 10;
  speed = 2;
  direction = 0;
  color = "green";
  eyeDirection = 0;
  mouthSize = 0;

  constructor(public player: Player) {
    this.reset();
  }
  reset() {
    this.color = `hsl(${Math.random() * 360}, 80%, 50%)`;
    do {
      this.x = Math.random() * WIDTH;
      this.y = Math.random() * HEIGHT;
    } while (this.distanceToPlayer() < 200 + this.player.size);

    this.direction = Math.random() * Math.PI * 2;
    this.eyeDirection = this.direction;
    this.speed = Math.random() * 5 + 1;

    // food size is random but based to player size
    // At least half the player size, up to 1.4 times the player size
    this.size = this.player.size / 2 + (Math.random() * this.player.size - 0.1);

    // speed is related to size. bigger food is slower
    this.speed -= this.size / 10;
  }

  update(delta: number) {
    this.x += Math.cos(this.direction) * this.speed * delta * 60;
    this.y += Math.sin(this.direction) * this.speed * delta * 60;

    // wrap around the screen
    this.x = ((this.x % WIDTH) + WIDTH) % WIDTH;
    this.y = ((this.y % HEIGHT) + HEIGHT) % HEIGHT;

    // 30% chance to change direction slightly
    if (Math.random() < 0.3) {
      this.direction += Math.random() * 0.5 - 0.25;
    }

    // 5% chance to change direction a lot
    if (Math.random() < 0.05) {
      this.direction += Math.random() * 1.8 - 0.9;
    }

    // 30% chance to change speed slightly
    if (Math.random() < 0.3) {
      this.speed += Math.random() * 0.5 - 0.25;
      if (this.speed < MIN_SPEED) this.speed = MIN_SPEED;
      if (this.speed > MAX_SPEED) this.speed = MAX_SPEED;
    }

    let newMouthSize = 0;

    const distanceToPlayer = this.distanceToPlayer();
    if (distanceToPlayer < 80) {
      const directionToPlayer = this.directionToPlayer();

      if (this.size > this.player.size) {
        const interpolatedMouthSize = interpolate(
          distanceToPlayer,
          50,
          0,
          0,
          0.2
        );
        newMouthSize = interpolatedMouthSize;
        this.direction = this.direction * 0.9 + directionToPlayer * 0.1;
        this.eyeDirection = this.eyeDirection * 0.9 + directionToPlayer * 0.1;
      } else {
        // flee from player
        this.direction =
          this.direction * 0.9 + (directionToPlayer + Math.PI) * 0.1;
        this.eyeDirection = this.eyeDirection * 0.9 + this.direction * 0.1;
      }
    } else {
      this.eyeDirection = this.eyeDirection * 0.9 + this.direction * 0.1;
    }

    // Smoothly interpolate mouth size
    this.mouthSize = this.mouthSize * 0.9 + newMouthSize * 0.1;
  }
  directionToPlayer() {
    let dx = this.player.x - this.x;
    let dy = this.player.y - this.y;

    // Check if otherPlayer is partially visible on the left or right side of the screen
    if (dx > WIDTH - this.size / 2) {
      dx -= WIDTH;
    } else if (dx < -WIDTH + this.size / 2) {
      dx += WIDTH;
    }

    // Check if otherPlayer is partially visible on the top or bottom side of the screen
    if (dy > HEIGHT - this.size / 2) {
      dy -= HEIGHT;
    } else if (dy < -HEIGHT + this.size / 2) {
      dy += HEIGHT;
    }

    // // Consider the wrapping effect along the X-axis
    // if (Math.abs(dx) > WIDTH / 2) {
    //   dx = dx < 0 ? dx + WIDTH : dx - WIDTH;
    // }

    // // Consider the wrapping effect along the Y-axis
    // if (Math.abs(dy) > HEIGHT / 2) {
    //   dy = dy < 0 ? dy + HEIGHT : dy - HEIGHT;
    // }
    return Math.atan2(dy, dx);
  }

  distanceToPlayer = () => {
    const dx = Math.abs(this.x - this.player.x);
    const dy = Math.abs(this.y - this.player.y);

    // Calculate the minimum distance in both axes considering wrapping
    const distanceX = Math.min(dx, WIDTH - dx);
    const distanceY = Math.min(dy, HEIGHT - dy);

    // Calculate the actual distance
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    return distance - this.player.size / 2 - this.size / 2;
  };

  drawFood(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.eyeDirection);
    ctx.fillStyle = this.color;

    ctx.beginPath();
    const offsetAngle = 0.2;
    ctx.arc(
      0,
      0,
      this.size / 2,
      offsetAngle + this.mouthSize * Math.PI,
      offsetAngle + (2 - this.mouthSize) * Math.PI
    );

    // The mouth
    // A line from the end of the arc to the centre
    ctx.lineTo(this.size * 0.25, this.size * 0.1);
    ctx.closePath();

    ctx.fill();
    ctx.strokeStyle = "hsl(135 39.6% 19.1%)";
    ctx.stroke();

    // Add an eye
    ctx.beginPath();
    ctx.arc(
      this.size * 0.1,
      -this.size * 0.2,
      this.size * 0.14,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fill();
    ctx.closePath();

    // Add a pupil
    ctx.beginPath();
    ctx.arc(
      this.size * 0.1,
      -this.size * 0.2,
      this.size * 0.08,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.drawFood(ctx, this.x, this.y);
    // Handle wrapping around the screen
    if (this.x < this.size / 2) {
      this.drawFood(ctx, this.x + WIDTH, this.y);
    }
    if (this.x > WIDTH - this.size / 2) {
      this.drawFood(ctx, this.x - WIDTH, this.y);
    }
    if (this.y < this.size / 2) {
      this.drawFood(ctx, this.x, this.y + HEIGHT);
    }
    if (this.y > HEIGHT - this.size / 2) {
      this.drawFood(ctx, this.x, this.y - HEIGHT);
    }
  }
}
