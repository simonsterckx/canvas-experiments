export function saveHighscore(score: number) {
  const highScore = localStorage.getItem("highScore");
  if (highScore === null || score > parseInt(highScore)) {
    localStorage.setItem("highScore", score.toString());
  }
}

export function getHighscore() {
  return localStorage.getItem("highScore");
}
