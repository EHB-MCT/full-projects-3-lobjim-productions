import {updateScoreForPlayedGame} from './../Front-end/track-score.js';

var button = document.getElementById("escape-button");
var cell = document.getElementById("cell");
var mouse = document.getElementById("mouse");
var animation = document.getElementById("animation");
var backButton = document.getElementById('back');

var clicks = 0;

button.onclick = () => {
    clicks += 5;
    cell.style.top = (180 - clicks * 2) + "px";
    if (clicks >= 95) {
        button.style.display = "none";
        mouse.style.display = "none";
        animation.style.display = "block";
        backButton.style.display = "block";
        updateScoreForPlayedGame();
    }
}

