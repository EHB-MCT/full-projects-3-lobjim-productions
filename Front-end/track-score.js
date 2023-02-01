const gameIds = ['cat-game', 'vrije-yuku', 'not-yet', 'not-yet', 'not-yet', 'not-yet'];

let score = parseInt(localStorage.getItem('score'), 10) || 0;

gameIds.forEach((gameId, i) => {
  if (localStorage.getItem(gameId) === 'true') {
    score += 10;
  }
});

localStorage.setItem('score', score);

document.querySelector('#score').innerHTML = ("Score:",score);


