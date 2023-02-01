const parentContainer = document.querySelector(".spelletjes");
parentContainer.addEventListener("click", function(event) {
  if (event.target.matches(".spel1, .spel2, .spel3, .spel4, .spel5, .spel6")) {
    const gameId = event.target.getAttribute("data-gameId");
    if (localStorage.getItem(gameId) === "true") {
        event.preventDefault();
        window.location.href = './../installatie-games/'+gameId+'_info-spel.html';
    }
  }
});

