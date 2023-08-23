const HighScoreTypes = {
  highscore: "highScore",
  dailyHighscore: "dailyHighScore",
} as const;

export function saveHighscore(score: number) {
  saveScore(score);
  saveDailyHighscore(score);
}

function saveScore(score: number) {
  const highScore = localStorage.getItem(HighScoreTypes.highscore);
  if (highScore === null || score > parseInt(highScore)) {
    localStorage.setItem(HighScoreTypes.highscore, score.toString());
  }
}

export function getHighscore() {
  return localStorage.getItem(HighScoreTypes.highscore);
}

export function saveDailyHighscore(score: number) {
  const dailyHighscore = getDailyHighscore();
  if (!dailyHighscore || score > dailyHighscore) {
    const today = getTodaysDate();
    localStorage.setItem(
      HighScoreTypes.dailyHighscore,
      JSON.stringify({
        [today]: score,
      })
    );
  }
}

export function getDailyHighscore(): number {
  const today = getTodaysDate();
  const highscores =
    JSON.parse(localStorage.getItem(HighScoreTypes.dailyHighscore) || "null") ||
    {};

  return highscores[today] || 0;
}

function getTodaysDate() {
  return new Date().toISOString().split("T")[0];
}
