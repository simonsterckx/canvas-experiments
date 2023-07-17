export class KeyboardController {
  rightPressed = false;
  leftPressed = false;
  downPressed = false;
  upPressed = false;

  get horizontalMovement() {
    return this.leftPressed ? -1 : this.rightPressed ? 1 : 0;
  }
  get verticalMovement() {
    return this.upPressed ? -1 : this.downPressed ? 1 : 0;
  }

  constructor(public canvas: HTMLCanvasElement) {
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
  }
  reset() {
    this.rightPressed = false;
    this.leftPressed = false;
    this.downPressed = false;
    this.upPressed = false;
  }

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
  };
  keyDownHandler = (event: KeyboardEvent) => {
    if (event.key === "d") {
      this.rightPressed = true;
    } else if (event.key === "a") {
      this.leftPressed = true;
    }
    if (event.key === "s") {
      this.downPressed = true;
      this.upPressed = false;
    } else if (event.key === "w") {
      this.upPressed = true;
    }
  };
}
