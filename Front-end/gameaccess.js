//get from hidden inputfield html
let code = document.querySelector("#pswrd-spel").value;
let gameId = document.querySelector("#gameId").value;

const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const password = document.querySelector("#password").value;
    if (password === code) {
        //update password given naar 'GAMEID'
        localStorage.setItem(gameId, "true")
        window.location.href = './../installatie-games/'+gameId+'.html';


    } else {
        document.querySelector('#error-message').innerHTML = 'Incorrect password. Please try again.';
    }
});

//update password given naar 'GAMEID'
if (localStorage.getItem(gameId)) {
    window.location.href = './../installatie-games/'+gameId+'.html';
}