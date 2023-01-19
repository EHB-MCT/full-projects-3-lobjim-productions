console.log('OK')
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
        })
    })


}

function errorLocation() {
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)

}