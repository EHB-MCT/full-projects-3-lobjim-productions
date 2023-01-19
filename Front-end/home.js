console.log('OK')

var map = L.map('map').setView([50.85045, 4.34878], 10);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


let location = navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
}

function errorLocation() {
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)

}