console.log('OK')
const main_popup = document.querySelector('.main-popup');
const close_btn = document.querySelector('.close-btn');
// const buttons = document.querySelector('.buttons');
// const mapContainer = document.querySelector('.mapContainer');

const popup = document.querySelector('.popup');
close_btn.addEventListener('click', () => {
    main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 500);
    // buttons.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
    // mapContainer.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';

});






let points = []
var map = L.map('map').setView([51.2194475, 4.4024643], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


let location = navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {

    let marker = L.marker([position.coords.latitude, position.coords.longitude], {
        customId: 155454,
        type: 'resto'
    })

    let marker2 = L.marker([51.2194475, 4.4424643], {
        customId: 1575454,
        type: 'WC'
    });
    let marker3 = L.marker([51.2194475, 4.5024643], {
        customId: 616564,
        type: 'Park'
    });
    points.push(marker, marker2, marker3)
    points.forEach(el => {
        console.log(el)
        el.addTo(map)
        el.on('click', e => {
            console.log(e.target.options)
            popup.style.display = 'flex';
            main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
            // buttons.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
            // mapContainer.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
        })
    })


}

function errorLocation() {
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)

}