//get from hidden inputfield html
let code = "GEVANGENIS";
let gameId = 'spel1'

//const password = document.querySelector("#password").value;

const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const password = document.querySelector("#password").value;
    if (password === code) {
        //update password given naar 'GAMEID'
        localStorage.setItem(gameId, "true")
        //document.getElementById('locked_1').style.display = "none";

        window.location.href = './../installatie-games/cat-game.html';

    } else {
        document.querySelector('#error-message').innerHTML = 'Incorrect password. Please try again.';
    }
});

//update password given naar 'GAMEID'
if (localStorage.getItem(gameId)) {
    //document.getElementById('locked_1').style.display = "none";
    window.location.href = './../installatie-games/cat-game.html';
}


// let gameId;

// const form = document.querySelector("form");
// form.addEventListener("submit", function(event) {
//     event.preventDefault();
//     const password = document.querySelector("#password").value;
//     gameId = document.querySelector("#game-id").value;
//     const code = document.querySelector("#pswrd-"+gameId).value;
//     if (password === code) {
//         localStorage.setItem(gameId, "true");
//         window.location.href = './../installatie-games/'+gameId+'.html';
//     } else {
//         document.querySelector('#error-message').innerHTML = 'Incorrect password. Please try again.';
//     }
// });

// if (localStorage.getItem(gameId)) {
//     window.location.href = './../installatie-games/'+gameId+'.html';
// }
