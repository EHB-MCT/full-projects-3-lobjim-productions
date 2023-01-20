window.addEventListener('click', (e) => {
    if (e.target == document.querySelector('.popup-overlay')) {
        main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    }
});

// window.addEventListener('click', (e) => {
//     if (e.target == document.querySelector('.buttons')) {
//         buttons.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
//         setTimeout(() => {
//             buttons.style.display = 'none';
//         }, 500);
//     }
// });