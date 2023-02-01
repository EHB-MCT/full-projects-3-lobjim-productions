import {updateScoreForPlayedGame, getScore} from './../Front-end/track-score.js';

document.getElementById('replay').style.display = "none";
const animationURL = document.getElementById('gif-cat');

// hide animationurl 
animationURL.style.display = "none";

// Access DOM element object
const rotated = document.getElementById('rotated');

// Variable to hold the current angle of rotation
let rotation = 0;
// How much to rotate the image at a time
const angle = 8;

let rotationCounter = 0;

function rotateImage() {
    // Check if the rotation counter is less than 300
    if (rotationCounter < 600) {
        rotation = (rotation + angle) % 360;
        rotated.style.transform = `rotate(${rotation}deg)`;
        rotationCounter++;
        // Start game
        localStorage.setItem('isPlayingCatGame', true);

    } else {
        // If the rotation counter is 600 or more, change image source to the animation URL
        rotated.style.transform = `rotate(0deg)`;
        rotated.src = animationURL.src;
        animationURL.style.display = "block";
        // Remove the touchmove event listener to stop the rotation
        document.getElementById("rotate").removeEventListener('touchmove', rotateImage);
        document.getElementById('replay').style.display = "block";
        // End game
        localStorage.removeItem('isPlayingCatGame');

    }
}

document.getElementById("rotate").addEventListener('touchmove', event => {
    rotateImage();
    console.log(event)
});

// Update  score based on status of cat-game
if (!localStorage.getItem('isPlayingCatGame')) {
    let score = updateScoreForPlayedGame();
    // Add 20 points to  score
    score += 20;
    getScore()
  }

