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

  update(horizontalDisplacement: number, verticalDisplacement: number) {
    this.x += horizontalDisplacement * this.speed;
    this.y += verticalDisplacement * this.speed;

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

  distanceTo(other: { x: number; y: number }) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  collidesWith(other: { x: number; y: number; size: number }) {
    return this.distanceTo(other) <= this.size / 2 + other.size / 2;
  }
  grow() {
    this.size += 4;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = tomatoDark.tomato9;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = tomatoDark.tomato8;
    ctx.lineWidth = 2;
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
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
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
