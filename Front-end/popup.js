window.addEventListener('click', (e) => {
    if (e.target == document.querySelector('.popup-overlay')) {
        main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    }
});