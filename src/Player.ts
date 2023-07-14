import { HEIGHT, WIDTH } from "./Constants";

const tomatoDark = {
  tomato8: "hsl(10, 80.2%, 35.7%)",
  tomato9: "hsl(10, 78.0%, 54.0%)",
};
export class Player {
  x: number;
  y: number;
  size: number;
  speed: number;

  constructor(x = 0, y = 0) {
    this.size = 50;
    this.x = x;
    this.y = y;
    this.speed = 6;
  }

  update(horizontalDisplacement: number, verticalDisplacement: number) {
    this.x += horizontalDisplacement * this.speed;
    this.y += verticalDisplacement * this.speed;
  }

  distanceTo(other: { x: number; y: number }) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  collidesWith(other: { x: number; y: number; size: number }) {
    return this.distanceTo(other) <= this.size / 2 + other.size / 2;
  }
  grow() {
    this.size += 5;
  }

  drawPlayer(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = tomatoDark.tomato9;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = tomatoDark.tomato8;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  draw(ctx: CanvasRenderingContext2D) {
    let x1 = ((this.x % WIDTH) + WIDTH) % WIDTH;
    let y1 = ((this.y % HEIGHT) + HEIGHT) % HEIGHT;
    this.x = x1;
    this.y = y1;
    let x2 = x1 + this.size;
    let y2 = y1 + this.size;
    this.drawPlayer(ctx);

    // check if touching right side
    if (x2 > WIDTH) {
      this.drawPlayer(ctx); // draw left copy

      // check if touching bottom
      if (y2 > HEIGHT) {
        this.drawPlayer(ctx); // draw top copy
      }
    }

    if (y2 > HEIGHT) {
      this.drawPlayer(ctx);
    }
  }
}
