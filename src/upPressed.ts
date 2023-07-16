document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

export let rightPressed = false;
export let leftPressed = false;
export let upPressed = false;
export let downPressed = false;
export let spacePressed = false;

export function resetKeys() {
  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;
  spacePressed = false;
}

function keyDownHandler(event: KeyboardEvent) {
  if (event.key === "d") {
    rightPressed = true;
  } else if (event.key === "a") {
    leftPressed = true;
  }
  if (event.key === "s") {
    downPressed = true;
  } else if (event.key === "w") {
    upPressed = true;
  }
  if (event.key === " ") {
    spacePressed = true;
  }
}
function keyUpHandler(event: KeyboardEvent) {
  if (event.key === "d") {
    rightPressed = false;
  } else if (event.key === "a") {
    leftPressed = false;
  }
  if (event.key === "s") {
    downPressed = false;
  } else if (event.key === "w") {
    upPressed = false;
  }
  if (event.key === " ") {
    spacePressed = false;
  }
}
