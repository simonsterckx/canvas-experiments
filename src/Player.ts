import { HEIGHT, WIDTH } from "./Constants";

const tomatoDark = {
  tomato8: "hsl(10, 80.2%, 35.7%)",
  tomato9: "hsl(10, 78.0%, 54.0%)",
};
const PLAYER_INITIAL_SIZE = 50;
const PLAYER_INITIAL_SPEED = 6;

export class Player {
  x: number;
  y: number;
  size: number;
  speed: number;
  eyeDirection = 0;

  constructor(x = 0, y = 0) {
    this.size = PLAYER_INITIAL_SIZE;
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
    this.speed = PLAYER_INITIAL_SPEED;
  }
  reset() {
    this.size = PLAYER_INITIAL_SIZE;
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
  }

  update(
    delta: number,
    horizontalDisplacement: number,
    verticalDisplacement: number
  ) {
    this.x += horizontalDisplacement * this.speed * delta * 60;
    this.y += verticalDisplacement * this.speed * delta * 60;

    if (horizontalDisplacement || verticalDisplacement) {
      this.eyeDirection = Math.atan2(
        verticalDisplacement,
        horizontalDisplacement
      );
    }

    // wrap around the screen
    this.x = ((this.x % WIDTH) + WIDTH) % WIDTH;
    this.y = ((this.y % HEIGHT) + HEIGHT) % HEIGHT;
  }

  grow() {
    if (this.size < 100) {
      this.size += 4;
    } else if (this.size < 200) {
      this.size += 3;
    } else if (this.size < 300) {
      this.size += 2;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.drawPlayer(ctx, this.x, this.y);

    // Handle wrapping around the screen
    if (this.x < this.size) {
      this.drawPlayer(ctx, this.x + WIDTH, this.y);
    }
    if (this.x > WIDTH - this.size) {
      this.drawPlayer(ctx, this.x - WIDTH, this.y);
    }
    if (this.y < this.size) {
      this.drawPlayer(ctx, this.x, this.y + HEIGHT);
    }
    if (this.y > HEIGHT - this.size) {
      this.drawPlayer(ctx, this.x, this.y - HEIGHT);
    }
  }

  drawPlayer(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.eyeDirection);

    ctx.fillStyle = tomatoDark.tomato9;
    ctx.beginPath();

    // The circle
    ctx.beginPath();
    const offsetAngle = 0.2;
    const mouthSize = 0.1;
    ctx.arc(
      0,
      0,
      this.size / 2,
      offsetAngle + mouthSize * Math.PI,
      offsetAngle + (2 - mouthSize) * Math.PI
    );

    // The mouth
    // A line from the end of the arc to the centre
    ctx.lineTo(this.size * 0.25, this.size * 0.1);
    ctx.closePath();

    ctx.fill();

    ctx.strokeStyle = tomatoDark.tomato8;
    ctx.lineWidth = 2;
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
}
