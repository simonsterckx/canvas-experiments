import { isMobile } from "./Constants";

const JOYSTICK_WIDTH = 200;
const HALF_JOYSTICK_WIDTH = JOYSTICK_WIDTH / 2;
const JOYSTICK_HEIGHT = 200;
const HALF_JOYSTICK_HEIGHT = JOYSTICK_HEIGHT / 2;
const JOYSTICK_RADIUS = 50;
const JOYSTICK_MAX_RADIUS = 50;
const TWO_PI = Math.PI * 2;
export class VirtualJoystick {
  x: number = 0;
  y: number = 0;
  radius: number = 0;
  maxRadius: number = 0;
  isPressed = false;
  isMobile = false;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  disabled = false;
  constructor() {
    this.isPressed = false;
    if (!isMobile) return;

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;
    this.canvas.width = JOYSTICK_WIDTH;
    this.canvas.height = JOYSTICK_HEIGHT;

    const left = window.innerWidth - JOYSTICK_WIDTH;
    const top = window.innerHeight - JOYSTICK_HEIGHT;
    this.canvas.style.transform = `translate(${left}px, ${top}px)`;

    this.canvas.className = "joystick";
    document.body.appendChild(this.canvas);

    document.body.addEventListener("touchstart", this.onBodyTouchStart);
    document.body.addEventListener("touchstart", this.onMouseDown);
    document.body.addEventListener("touchend", this.onMouseUp);
    document.body.addEventListener("touchmove", this.onMouseMove);
    document.body.addEventListener("contextmenu", (e) => e.preventDefault());
    this.draw();
  }
  reset() {
    this.disabled = false;
    this.x = 0;
    this.y = 0;

    this.draw();
  }
  onBodyTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    if (this.disabled) return;

    // Move the joystick to the position of the mouse
    const left = e.touches[0].clientX - HALF_JOYSTICK_WIDTH;
    const top = e.touches[0].clientY - HALF_JOYSTICK_HEIGHT;
    this.canvas.style.transform = `translate(${left}px, ${top}px)`;
  };
  onMouseDown = (e: TouchEvent) => {
    e.preventDefault();
    this.isPressed = true;
  };
  onMouseUp = (e: TouchEvent) => {
    e.preventDefault();
    this.isPressed = false;
    this.x = 0;
    this.y = 0;
  };
  onMouseMove = (e: TouchEvent) => {
    e.preventDefault();
    if (this.isPressed) {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;

      this.x = (x - rect.left - HALF_JOYSTICK_WIDTH) / JOYSTICK_MAX_RADIUS;
      this.y = (y - rect.top - HALF_JOYSTICK_HEIGHT) / JOYSTICK_MAX_RADIUS;

      if (this.x > 1) this.x = 1;
      if (this.x < -1) this.x = -1;
      if (this.y > 1) this.y = 1;
      if (this.y < -1) this.y = -1;

      this.draw();
    }
  };
  draw() {
    this.ctx.clearRect(0, 0, JOYSTICK_WIDTH, JOYSTICK_HEIGHT);
    this.ctx.beginPath();
    this.ctx.arc(
      HALF_JOYSTICK_WIDTH,
      HALF_JOYSTICK_HEIGHT,
      JOYSTICK_RADIUS,
      0,
      TWO_PI
    );
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fill();
    this.ctx.closePath();
    if (this.isPressed) {
      this.ctx.beginPath();
      this.ctx.arc(
        HALF_JOYSTICK_WIDTH + this.x * JOYSTICK_MAX_RADIUS,
        HALF_JOYSTICK_HEIGHT + this.y * JOYSTICK_MAX_RADIUS,
        JOYSTICK_RADIUS / 2,
        0,
        TWO_PI
      );
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
}
