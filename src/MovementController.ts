export class MovementController {
  rightPressed = false;
  leftPressed = false;
  downPressed = false;
  upPressed = false;
  spacePressed = false;
  canvasWidth: number;
  canvasHeight: number;
  get horizontalMovement() {
    return this.leftPressed ? -1 : this.rightPressed ? 1 : 0;
  }
  get verticalMovement() {
    return this.upPressed ? -1 : this.downPressed ? 1 : 0;
  }

  constructor(public canvas: HTMLCanvasElement) {
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);

    canvas.addEventListener("touchstart", this.touchStartHandler, false);
    canvas.addEventListener("touchmove", this.touchStartHandler, false);

    canvas.addEventListener("touchend", this.touchEndHandler, false);
    canvas.addEventListener("touchcancel", this.touchEndHandler, false);

    this.canvasWidth = canvas.getBoundingClientRect().width;
    this.canvasHeight = canvas.getBoundingClientRect().height;
  }
  reset() {
    this.rightPressed = false;
    this.leftPressed = false;
    this.downPressed = false;
    this.upPressed = false;
    this.spacePressed = false;
  }
  touchStartHandler = (event: TouchEvent) => {
    event.preventDefault();
    const touch = event.changedTouches[0];
    const x = touch.clientX - this.canvas.offsetLeft;
    const y = touch.clientY - this.canvas.offsetTop;
    // Divide the screen into 3x3 grid.
    // The center grid is the deadzone.

    // Left
    if (x < this.canvasWidth / 3) {
      this.leftPressed = true;
      this.rightPressed = false;
      console.log("left", x, this.canvasWidth / 3);
    }
    // Right
    else if (x > (this.canvasWidth * 2) / 3) {
      this.leftPressed = false;
      this.rightPressed = true;
      console.log("right");
    }
    // Up
    if (y < this.canvasHeight / 3) {
      this.upPressed = true;
    }
    // Down
    else if (y > (this.canvasHeight * 2) / 3) {
      this.downPressed = true;
    }
  };
  touchEndHandler = (event: TouchEvent) => {
    event.preventDefault();

    this.upPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;
  };

  keyUpHandler = (event: KeyboardEvent) => {
    if (event.key === "d") {
      this.rightPressed = false;
    } else if (event.key === "a") {
      this.leftPressed = false;
    }
    if (event.key === "s") {
      this.downPressed = false;
    } else if (event.key === "w") {
      this.upPressed = false;
    }
    if (event.key === " ") {
      this.spacePressed = false;
    }
  };
  keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === "d") {
      this.rightPressed = true;
    } else if (event.key === "a") {
      this.leftPressed = true;
    }
    if (event.key === "s") {
      this.downPressed = true;
    } else if (event.key === "w") {
      this.upPressed = true;
    }
    if (event.key === " ") {
      this.spacePressed = true;
    }
  };
}
