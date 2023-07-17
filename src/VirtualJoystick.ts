export class VirtualJoystick {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  isPressed: boolean;
  isMobile: boolean;
  canvas!: HTMLCanvasElement;
  ctx: any;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.maxRadius = 0;
    this.isPressed = false;
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!this.isMobile) return;

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = 200;
    this.canvas.height = 200;
    this.radius = 50;
    this.maxRadius = 50;
    this.canvas.style.position = "absolute";
    // Bottom right
    this.canvas.style.bottom = "20px";
    this.canvas.style.right = "20px";
    this.canvas.style.transform = "translate(-50%, -50%)";
    this.canvas.style.touchAction = "none";
    this.canvas.style.userSelect = "none";
    this.canvas.style.borderRadius = "50%";
    this.canvas.style.background = "rgba(0, 0, 0, 0.1)";
    this.canvas.style.boxShadow = "0 0 0 1px rgba(0, 0, 0, 0.1)";
    this.canvas.style.cursor = "pointer";
    this.canvas.style.touchAction = "none";
    document.body.appendChild(this.canvas);
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("touchstart", this.onMouseDown);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
    this.canvas.addEventListener("touchend", this.onMouseUp);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("touchmove", this.onMouseMove);
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.draw();
  }
  onMouseDown = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    this.isPressed = true;
  };
  onMouseUp = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    this.isPressed = false;
    this.x = 0;
    this.y = 0;
  };
  onMouseMove = (e: TouchEvent | MouseEvent) => {
    e.preventDefault();
    if (this.isPressed) {
      const rect = this.canvas.getBoundingClientRect();
      const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      this.x = (x - rect.left - this.canvas.width / 2) / this.maxRadius;
      this.y = (y - rect.top - this.canvas.height / 2) / this.maxRadius;
      if (this.x > 1) this.x = 1;
      if (this.x < -1) this.x = -1;
      if (this.y > 1) this.y = 1;
      if (this.y < -1) this.y = -1;

      this.draw();
    }
  };
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.arc(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    this.ctx.fill();
    this.ctx.closePath();
    if (this.isPressed) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.canvas.width / 2 + this.x * this.maxRadius,
        this.canvas.height / 2 + this.y * this.maxRadius,
        this.radius / 2,
        0,
        2 * Math.PI
      );
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
}
