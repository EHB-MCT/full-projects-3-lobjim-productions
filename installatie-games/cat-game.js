document.getElementById('replay').style.display = "none";

// Access DOM element object
const rotated = document.getElementById('rotated');

// Variable to hold the current angle of rotation
let rotation = 0;
// How much to rotate the image at a time
const angle = 5;

let rotationCounter = 0;
const animationURL = './images/vomit-cat.gif';

function rotateImage() {
    // Check if the rotation counter is less than 300
    if (rotationCounter < 300) {
        rotation = (rotation + angle) % 360;
        rotated.style.transform = `rotate(${rotation}deg)`;
        rotationCounter++;


    } else {
        // If the rotation counter is 300 or more, change the image source to the animation URL
        rotated.style.transform = `rotate(0deg)`;
        rotated.src = animationURL;
        // Remove the touchmove event listener to stop the rotation
        document.getElementById("rotate").removeEventListener('touchmove', rotateImage);
        document.getElementById('replay').style.display = "block";
    }
}

document.getElementById("rotate").addEventListener('touchmove', event => {
    rotateImage();
    console.log(event)
});