console.log('OK')
const main_popup = document.querySelector('.main-popup');
const popup = document.querySelector('.popup');


let buttons = document.getElementsByName('btns')

buttons.forEach(button => {
    button.addEventListener('click', function () {
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active')
    })
})


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
            console.log(e.target)
            const id = e.target.options.customId

            getToiletData().then(data => {
                console.log(data)
                const findToilet = data.features.find(el => el.attributes.OBJECTID == id)
                console.log(findToilet)
                renderToiletData(findToilet)
            })

            popup.style.display = 'flex';
            main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
        })
    })
}

function renderToiletData(findToilet) {
    let uur
    if (findToilet.attributes.OPENINGSUREN_OPM == null) {
        uur = ` <p>Uur: /</p>`
    } else {
        uur = ` <p>Uur: ${findToilet.attributes.OPENINGSUREN_OPM}</p>`
    }

    console.log(findToilet)
    main_popup.innerHTML = ""
    main_popup.innerHTML = `<div class="popup-content">
    <span class="close-btn">&times;</span>
    <div class="naam">
        <h2>${findToilet.attributes.OMSCHRIJVING}</h2>
    </div>
    <div class="info">
        <div class="info_leeftijd">
            <p>${findToilet.attributes.STRAAT} ${findToilet.attributes.HUISNUMMER}, ${findToilet.attributes.POSTCODE} Antwerpen</p>
        </div>
        <div class="info_uur">
            <p>${uur}</p>
        </div>
    </div>
    <div class="installaties">
        <p>Installatie aanwezig aan in ingang</p>
    </div>
    <div class="like-go">
        <button id="like"><img id="like_img" src="img/like.png"></button>
        <button id="btn_gaan">Gaan</button>
    </div>
</div>`

    const close_btn = document.querySelector('.close-btn');
    close_btn.addEventListener('click', () => {
        main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);


    });
}
async function getToiletData() {

    const res = await fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek1/MapServer/8/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    return await res.json()
}