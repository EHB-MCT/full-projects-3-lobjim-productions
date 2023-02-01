import { getScore } from './../Front-end/track-score.js';

const gameIds = ['cat-game', 'bevrijd-yuku', 'boek', 'mieren', 'bloem', 'ukulele'];

gameIds.forEach((gameId, i) => {
  if (i === 0) {
    localStorage.setItem(gameId, 'true');
  }
  if (localStorage.getItem(gameId) === 'true') {
    document.getElementById(`locked_${i+1}`).style.display = 'none';
    let score = getScore();
    document.querySelector('#score').innerHTML = score;
  }
});



