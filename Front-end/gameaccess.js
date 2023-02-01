const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const password = document.querySelector("#password").value;
    const gameId = localStorage.getItem("gameId");
    const code = localStorage.getItem("code");
    if (password === code) {
        localStorage.setItem(gameId, "true")
        window.location.href = './../installatie-games/'+gameId+'_info-spel.html';

    } else {
        document.querySelector('#error-message').innerHTML = 'Incorrect password. Please try again.';
    }
});



