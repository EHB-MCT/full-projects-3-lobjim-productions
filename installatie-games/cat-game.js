// console.log("ewa?")
// const rotate = (EL) => {
//     let ang = 0; // All angles are expressed in radians
//     let angStart = 0;
//     let isStart = false;

//     const angXY = (ev) => {
//       const bcr = EL.getBoundingClientRect();
//       const radius = bcr.width / 2;
//       const { clientX, clientY } = ev.touches ? ev.touches[0] : ev;
//       const y = clientY - bcr.top - radius;  // y from center
//       const x = clientX - bcr.left - radius; // x from center
//       return Math.atan2(y, x);
//     };
  
//     const mousedown = (ev) => {
//       isStart = true;
//       angStart = angXY(ev) - ang;
//     };
  
//     const mousemove = (ev) => {
//       if (!isStart) return;
//       ev.preventDefault();
//       ang = angXY(ev) - angStart;
//       EL.style.transform = `rotateZ(${ang}rad)`;
//     };
//     const mouseup = () => {
//       isStart = false; 
//     };
  
//     EL.addEventListener("mousedown", mousedown);
//     document.addEventListener("mousemove", mousemove);
//     document.addEventListener("mouseup", mouseup);
// };
  
//   document.querySelectorAll("rotate").forEach(rotate);
//   console.log("whats wrong?")


// Access DOM element object
const rotated = document.getElementById('rotated');

// Variable to hold the current angle of rotation
let rotation = 0;
// How much to rotate the image at a time
const angle = 90;

function rotateImage() {
    // Ensure angle range of 0 to 359 with "%" operator,
    // e.g., 450 -> 90, 360 -> 0, 540 -> 180, etc.

    rotation = (rotation + angle) % 360;
    rotated.style.transform = `rotate(${rotation}deg)`;
}




document.getElementById("rotate").addEventListener('touchmove', event => {
    rotateImage();
    console.log(event)
});