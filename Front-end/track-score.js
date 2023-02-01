export function updateScoreForNewGame() {
    let score = parseInt(localStorage.getItem('score'), 10) || 0;
    score += 100;
    localStorage.setItem('score', score);
    return score;
}
  
export function updateScoreForPlayedGame() {
    let score = parseInt(localStorage.getItem('score'), 10) || 0;
    score += 20;
    localStorage.setItem('score', score);
    return score;
}

export function getScore() {
    let score = parseInt(localStorage.getItem('score'), 10) || 0;
    return score;
}
  

