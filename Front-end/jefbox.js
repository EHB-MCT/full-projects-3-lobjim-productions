const gameIds = ['cat-game', 'vrije-yuku', 'not-yet', 'not-yet', 'not-yet', 'not-yet'];

gameIds.forEach((gameId, i) => {
  if (localStorage.getItem(gameId) === 'true') {
    document.getElementById(`locked_${i+1}`).style.display = 'none';
  }
});


