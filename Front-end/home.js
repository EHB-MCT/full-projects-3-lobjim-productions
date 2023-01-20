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
    let marker = L.marker([position.coords.latitude, position.coords.longitude])
    marker.addTo(map)
}

function errorLocation() {
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
}


let toiletMarkers = []
const toilet = document.getElementById('wc')
toilet.addEventListener('click', e => {
    toiletMarkers.forEach(el => {
        console.log(el)
        map.removeLayer(el)

    })
    console.log('click')
    toiletMarkers = []
    getToiletData().then(data => {

        data.features.forEach(el => {
            const id = el.attributes.OBJECTID
            const xPos = el.geometry.x
            const yPos = el.geometry.y
            const type = el.attributes.TYPE
            let marker = L.marker([yPos, xPos], {
                customId: id,
                type: type
            })
            toiletMarkers.push(marker)
        })

        renderToiletMarker()
    })

})

function renderToiletMarker() {
    toiletMarkers.forEach(el => {
        el.addTo(map)
        el.on('click', e => {
            console.log(e)
            popup.style.display = 'flex';
            main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
        })
    })
}


async function getToiletData() {

    const res = await fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek1/MapServer/8/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    return await res.json()
}