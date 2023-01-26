const main_popup = document.querySelector('.main-popup');
const popup = document.querySelector('.popup');
let userPosition
let buttons = document.getElementsByName('btns')

buttons.forEach(button => {
    button.addEventListener('click', function () {
        buttons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active')
    })
})



let points = []
var map = L.map('map').setView([51.2194475, 4.4024643], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let location = navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
})

function successLocation(position) {
    if (position) {
        userPosition = [position.coords.latitude, position.coords.longitude]
        console.log(position.coords.latitude)
        let loc = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }

        console.log(loc)
        localStorage.setItem('userPos', JSON.stringify(loc))
        let pos = L.control.locate({
            locateOptions: {
                enableHighAccuracy: true
            }
        }).addTo(map);
        pos.start();

    } else {
        errorLocation()

    }



}

function errorLocation() {
    userPosition = [51.2194475, 4.4024643]
    L.marker([51.2194475, 4.4024643]).addTo(map)
    map.flyTo([51.2194475, 4.4024643], 12)
}


let toiletMarkers = []
let busMarkers = []
let parkMarkers = []
let restoMarkers = []
let routeWay = []
let jefMarkers = []

let toiletIcon = L.icon({
    iconUrl: 'img/toilet.png',
    iconSize: [35, 45], // size of the icon
});

let restoIcon = L.icon({
    iconUrl: 'img/resto.png',
    iconSize: [35, 45], // size of the icon
});


let parkIcon = L.icon({
    iconUrl: 'img/parkpin.png',
    iconSize: [35, 45], // size of the icon
});

let busIcon = L.icon({
    iconUrl: 'img/bus.png',
    iconSize: [35, 45], // size of the icon
});
let jefIcon = L.icon({
    iconUrl: 'img/jefIcon.png',
    iconSize: [40, 55], // size of the icon
});

const resto = document.getElementById('eten')
resto.addEventListener('click', e => {
    toiletMarkers.forEach(el => {
        map.removeLayer(el)

    })
    busMarkers.forEach(el => {
        map.removeLayer(el)

    })
    parkMarkers.forEach(el => {
        map.removeLayer(el)

    })
    restoMarkers.forEach(el => {
        map.removeLayer(el)

    })

    restoMarkers = []
    getRestoData().then(async data => {
        data.forEach(el => {
            const id = el.id
            let adress = el.adres
            const type = 'resto'
            let lat = null
            let lon = null
            adress = adress.replace(/\s/g, '%20')
            getLatLng(adress).then(async data => {
                lon = await data.features[0].properties.lon
                lat = await data.features[0].properties.lat

                let marker = await L.marker([lat, lon], {
                    customId: id,
                    type: type,
                    icon: restoIcon

                })
                await restoMarkers.push(marker)
            })

        })
        setTimeout(() => {
            renderRestoMarker()
        }, 750)
    })
})

const jef = document.getElementById('optionDate')

jef.addEventListener('change', e => {
    console.log(e.target.value)
    const date = e.target.value
    jefMarkers.forEach(el => {
        map.removeLayer(el)
    })

    jefMarkers = []

    getJefData().then(data => {
        const filterByDate = data.filter(el => el.Datum == date)
        filterByDate.forEach(el => {
            console.log(el)
            let adress = el.adres
            let lat = null
            let lon = null
            adress = adress.replace(/\s/g, '%20')
            getLatLng(adress).then(async data => {
                lon = await data.features[0].properties.lon
                lat = await data.features[0].properties.lat

                let marker = await L.marker([lat, lon], {
                    customId: el.id,
                    type: 'jef',
                    icon: jefIcon

                })
                await jefMarkers.push(marker)
            })
        })
        setTimeout(() => {
            renderJefMarker()
        }, 1500)
    })
})


const toilet = document.getElementById('wc')
toilet.addEventListener('click', e => {
    toiletMarkers.forEach(el => {
        map.removeLayer(el)

    })
    busMarkers.forEach(el => {
        map.removeLayer(el)

    })
    parkMarkers.forEach(el => {
        map.removeLayer(el)

    })
    restoMarkers.forEach(el => {
        map.removeLayer(el)

    })
    toiletMarkers = []
    getToiletData().then(data => {

        data.features.forEach(el => {
            const id = el.attributes.OBJECTID
            const xPos = el.geometry.x
            const yPos = el.geometry.y
            const type = el.attributes.TYPE
            let marker = L.marker([yPos, xPos], {
                customId: id,
                type: type,
                icon: toiletIcon,
            })
            toiletMarkers.push(marker)
        })

        renderToiletMarker()
    })

})

const park = document.getElementById('park')
park.addEventListener('click', e => {
    toiletMarkers.forEach(el => {
        map.removeLayer(el)

    })
    busMarkers.forEach(el => {
        map.removeLayer(el)

    })

    parkMarkers.forEach(el => {
        map.removeLayer(el)

    })
    restoMarkers.forEach(el => {
        map.removeLayer(el)

    })
    parkMarkers = []
    getParkData().then(data => {
        const slice = data.features.slice(5, 35)
        slice.forEach(el => {
            const id = el.attributes.OBJECTID
            const xPos = el.geometry.rings[0][0][0]
            const yPos = el.geometry.rings[0][0][1]
            const type = el.attributes.TYPE
            let marker = L.marker([yPos, xPos], {
                customId: id,
                type: type,
                icon: parkIcon

            })
            parkMarkers.push(marker)
        })
        renderParkMarker()
    })

})


const bus = document.getElementById('transport')
bus.addEventListener('click', e => {
    toiletMarkers.forEach(el => {
        map.removeLayer(el)
    })
    busMarkers.forEach(el => {
        map.removeLayer(el)

    })
    parkMarkers.forEach(el => {
        map.removeLayer(el)

    })
    restoMarkers.forEach(el => {
        map.removeLayer(el)

    })
    busMarkers = []
    getTransportData().then(data => {

        data.features.forEach(el => {
            const id = el.properties.STOPID
            const xPos = el.geometry.coordinates[0]
            const yPos = el.geometry.coordinates[1]
            const type = 'Halte'
            let marker = L.marker([yPos, xPos], {
                customId: id,
                type: type,
                icon: busIcon
            })
            busMarkers.push(marker)
        })
        renderBusMarker()

    })

})

function renderJefMarker() {
    let markerGroup = new L.FeatureGroup();
    jefMarkers.forEach(el => {
        markerGroup.addLayer(el)
        markerGroup.addTo(map);
        el.on('click', e => {
            localStorage.setItem('pos', JSON.stringify([e.target.options, e.latlng]))
            const id = e.target.options.customId
            map.flyTo([e.target._latlng.lat, e.target._latlng.lng], 15)
            getJefData().then(data => {
                const findJef = data.find(el => el.id == id)
                renderJefData(findJef)
            })

            popup.style.display = 'flex';
            main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
        })

    })
    map.fitBounds(markerGroup.getBounds());
}


function renderRestoMarker() {
    let markerGroup = new L.FeatureGroup();
    restoMarkers.forEach(el => {
        markerGroup.addLayer(el)
        markerGroup.addTo(map);
        el.on('click', e => {
            localStorage.setItem('pos', JSON.stringify([e.target.options, e.latlng]))
            const id = e.target.options.customId
            map.flyTo([e.target._latlng.lat, e.target._latlng.lng], 15)
            getRestoData().then(data => {
                const findResto = data.find(el => el.id == id)
                renderRestoData(findResto)
            })

            popup.style.display = 'flex';
            main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
        })

    })
    map.fitBounds(markerGroup.getBounds());

}

function renderParkMarker() {
    let markerGroup = new L.FeatureGroup();
    parkMarkers.forEach(el => {
        markerGroup.addLayer(el)
        markerGroup.addTo(map);
        el.on('click', e => {
            localStorage.setItem('pos', JSON.stringify([e.target.options, e.latlng]))
            const id = e.target.options.customId
            map.flyTo([e.target._latlng.lat, e.target._latlng.lng], 15)
            getParkData().then(data => {
                const findPark = data.features.find(el => el.attributes.OBJECTID == id)
                renderParkData(findPark)
            })

            popup.style.display = 'flex';
            main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
        })
    })
    map.fitBounds(markerGroup.getBounds());

}


function renderBusMarker() {
    let markerGroup = new L.FeatureGroup();
    busMarkers.forEach(el => {
        markerGroup.addLayer(el)
        markerGroup.addTo(map);
        el.on('click', e => {
            localStorage.setItem('pos', JSON.stringify([e.target.options, e.latlng]))
            const id = e.target.options.customId
            map.flyTo([e.target._latlng.lat, e.target._latlng.lng], 15)
            getTransportData().then(data => {
                const findBus = data.features.find(el => el.properties.STOPID == id)
                renderBusData(findBus)
            })

            popup.style.display = 'flex';
            main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
        })
    })
    map.fitBounds(markerGroup.getBounds());

}


function renderToiletMarker() {
    let markerGroup = new L.FeatureGroup();
    toiletMarkers.forEach(el => {
        markerGroup.addLayer(el)
        markerGroup.addTo(map);
        el.on('click', e => {
            const id = e.target.options.customId
            localStorage.setItem('pos', JSON.stringify([e.target.options, e.latlng]))
            map.flyTo([e.target._latlng.lat, e.target._latlng.lng], 15)
            getToiletData().then(data => {
                const findToilet = data.features.find(el => el.attributes.OBJECTID == id)
                renderToiletData(findToilet)
            })

            popup.style.display = 'flex';
            main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
        })
    })
    map.fitBounds(markerGroup.getBounds());

}


function renderJefData(jef) {
    let photobooth
    let wall

    if (jef.photobooth) {
        photobooth = `<p>Photobooth: <img src="img/true.png"></p>`
    } else {
        photobooth = `<p>Photobooth: <img src="img/false.png"></p>`
    }

    if (jef.wall) {
        wall = `<p>Interactive Wall: <img src="img/true.png"></p>`
    } else {
        wall = `<p>Interactive Wall: <img src="img/false.png"></p>`
    }
    console.log(jef)
    main_popup.innerHTML = ""
    main_popup.innerHTML = ` <div class="popup-content">
    <span class="close-btn">&times;</span>
    <div class="naam">
        <h2>${jef.Locatienaam}</h2>
    </div>

    <div class="naam">
    <p>${jef.adres}</p>
</div>
    <div class="info">
        <div class="info_photobooth">
            ${photobooth}
        </div>
        <div class="info_wall">
        ${wall}
        </div>
    </div>
    <div class="go">
        <button id="btn_gaan">Route</button>
        <button id="redirect"><img src="img/google_maps_white.png" alt="google maps""></button>
    </div>
`

    const redirect = document.getElementById('redirect')
    redirect.addEventListener("click", e => {
        const data = JSON.parse(localStorage.getItem('pos'))
        window.open(`http://maps.google.com?q=${data[1].lat}, ${data[1].lng}`, '_blank')
    })
    // ROUTE SYSTEM
    const route = document.getElementById('btn_gaan')
    route.addEventListener('click', e => {
        toiletMarkers.forEach(el => {
            map.removeLayer(el)
        })
        busMarkers.forEach(el => {
            map.removeLayer(el)

        })
        parkMarkers.forEach(el => {
            map.removeLayer(el)

        })
        restoMarkers.forEach(el => {
            map.removeLayer(el)

        })
        if (routeWay.length) {
            routeWay.forEach(route => {
                map.removeControl(route);
            })
            routeWay = []
        }
        const btn = document.getElementsByName('btn')
        btn.forEach(btn => {
            btn.disabled = true
        })
        const data = JSON.parse(localStorage.getItem('pos'))
        let routeMaker = L.Routing.control({
            draggableWaypoints: false,
            lineOptions: {
                addWaypoints: false,
                styles: [{
                    color: 'red',
                    opacity: 1,
                    weight: 6
                }]
            },
            createMarker: function () {
                return null;
            },
            waypoints: [
                L.latLng(userPosition[0], userPosition[1]),
                L.latLng(data[1].lat, data[1].lng)
            ],
        }).on('routesfound', function (e) {
            map.fitBounds([
                [userPosition[0], userPosition[1]],
                [data[1].lat, data[1].lng]
            ]);
            jefMarkers.forEach(data => {
                if (data.options.customId !== jef.id) {
                    map.removeLayer(data)
                }
            })
            const mToKm = Math.round(e.routes[0].summary.totalDistance / 100) / 10
            const sToMin = Math.floor(e.routes[0].summary.totalTime / 60);
            main_popup.innerHTML = ` <div class="popup-content">
            <div class="routeData">
            <h2> ${jef.Locatienaam}</h2>
                <p>${jef.adres}</p>

            </div>
             <div class="info_route">
             <p>${mToKm} km</p>
             <p>${sToMin} minuten</p>
            </div>
            <div class="stop">
                <button id="stop">Stop</button>
            </div>
        </div>`
            const stop = document.getElementById('stop')
            stop.addEventListener('click', e => {
                const btn = document.getElementsByName('btn')
                btn.forEach(btn => {
                    btn.disabled = false
                })
                main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 500);

                routeWay.forEach(route => {
                    map.removeControl(route);
                })
                routeWay = []
                main_popup.innerHTML = ""
                let markerGroup = new L.FeatureGroup();
                jefMarkers.forEach(el => {
                    markerGroup.addLayer(el)
                    markerGroup.addTo(map);
                })
                map.fitBounds(markerGroup.getBounds());
            })
        }).addTo(map);
        routeMaker.hide()
        routeWay.push(routeMaker)
    })
    const close_btn = document.querySelector('.close-btn');
    close_btn.addEventListener('click', () => {
        main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    });

}

function renderRestoData(resto) {
    console.log(resto)
    main_popup.innerHTML = ""
    main_popup.innerHTML = ` <div class="popup-content">
    <span class="close-btn">&times;</span>
    <div class="naam">
        <h2> ${resto.name}s</h2>
    </div>
    <div class="info">
                        <div class="info_leeftijd">
                            <p>${resto.adres}</p>
                        </div>
                        
                    </div>
                    <div class="hearth">
                <button value = ${resto.id} id="like"><img id="like_img" src="img/like.png"></button>
                </div>
                    <div class="like-go">
                    <button id="btn_gaan">Route</button>
                    <button id="redirect"><img src="img/google_maps_white.png" alt="google maps""></button></button>
            
                </div>

            </div>`

    const redirect = document.getElementById('redirect')
    redirect.addEventListener("click", e => {
        const data = JSON.parse(localStorage.getItem('pos'))
        window.open(`http://maps.google.com?q=${data[1].lat}, ${data[1].lng}`, '_blank')
    })

    // ROUTE SYSTEM
    const route = document.getElementById('btn_gaan')
    route.addEventListener('click', e => {
        if (routeWay.length) {
            routeWay.forEach(route => {
                map.removeControl(route);
            })
            routeWay = []
        }
        jefMarkers.forEach(el => {
            map.removeLayer(el)
        })
        const btn = document.getElementsByName('btn')
        btn.forEach(btn => {
            btn.disabled = true
        })
        const data = JSON.parse(localStorage.getItem('pos'))
        let routeMaker = L.Routing.control({
            draggableWaypoints: false,
            lineOptions: {
                addWaypoints: false,
                styles: [{
                    color: 'red',
                    opacity: 1,
                    weight: 6
                }]
            },
            createMarker: function () {
                return null;
            },
            waypoints: [
                L.latLng(userPosition[0], userPosition[1]),
                L.latLng(data[1].lat, data[1].lng)
            ],
        }).on('routesfound', function (e) {
            map.fitBounds([
                [userPosition[0], userPosition[1]],
                [data[1].lat, data[1].lng]
            ]);
            restoMarkers.forEach(data => {
                if (data.options.customId !== resto.id) {
                    map.removeLayer(data)
                }
            })
            const mToKm = Math.round(e.routes[0].summary.totalDistance / 100) / 10
            const sToMin = Math.floor(e.routes[0].summary.totalTime / 60);
            main_popup.innerHTML = ` <div class="popup-content">
            <div class="routeData">
            <h2> ${resto.name}</h2>
                <p>${resto.adres}</p>

            </div>
             <div class="info_route">
             <p>${mToKm} km</p>
             <p>${sToMin} minuten</p>
            </div>
            <div class="stop">
                <button id="stop">Stop</button>
            </div>
        </div>`
            const stop = document.getElementById('stop')
            stop.addEventListener('click', e => {
                const btn = document.getElementsByName('btn')
                btn.forEach(btn => {
                    btn.disabled = false
                })
                main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 500);

                routeWay.forEach(route => {
                    map.removeControl(route);
                })
                routeWay = []
                main_popup.innerHTML = ""
                let markerGroup = new L.FeatureGroup();
                restoMarkers.forEach(el => {
                    markerGroup.addLayer(el)
                    markerGroup.addTo(map);
                })
                let markerGroup2 = new L.FeatureGroup();
                jefMarkers.forEach(el => {
                    markerGroup2.addLayer(el)
                    markerGroup2.addTo(map);
                })
                map.fitBounds(markerGroup.getBounds());
            })
        }).addTo(map);
        routeMaker.hide()
        routeWay.push(routeMaker)
    })
    const close_btn = document.querySelector('.close-btn');
    close_btn.addEventListener('click', () => {
        main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    });

    const like = document.getElementById('like')
    like.addEventListener('click', e => {
        const data = JSON.parse(localStorage.getItem('pos'))

        console.log('click')
        if (localStorage.getItem('token')) {
            let token
            let base64Url = localStorage.getItem('token').split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            token = JSON.parse(jsonPayload);
            let likedPlace = {
                likeId: resto.id,
                userId: token.id,
                name: resto.name,
                adress: resto.adres,
                type: "Resto",
                lat: data[1].lat,
                long: data[1].lng,
            }
            fetch("https://jef-api.onrender.com/like", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        token: localStorage.getItem('token')

                    },
                    body: JSON.stringify(likedPlace)
                })
                .then(res => res.json())
                .then(data => {
                    alert(data.message)
                })
        } else {
            alert('connect to like')
        }

    })

    checkLike()

}

function renderParkData(park) {
    console.log(park)
    main_popup.innerHTML = ""
    main_popup.innerHTML = ` <div class="popup-content">
    <span class="close-btn">&times;</span>
    <div class="naam">
        <h2> ${park.attributes.NAAMLABEL} - ${park.attributes.TYPE}</h2>
    </div>
    <div class="info">
                        <div class="info_leeftijd">
                            <p>${park.attributes.STRAATNAAMLABEL}, ${park.attributes.POSTCODE} Antwerpen</p>
                        </div>
                    </div>
                    <div class="hearth">
                    <button value = ${park.attributes.OBJECTID} id="like"><img id="like_img" src="img/like.png"></button>
                    </div>
    <div class="like-go">
        <button id="btn_gaan">Route</button>
        <button id="redirect"><img src="img/google_maps_white.png" alt="google maps""></button></button>
    </div>
</div>`

    const redirect = document.getElementById('redirect')
    redirect.addEventListener("click", e => {
        const data = JSON.parse(localStorage.getItem('pos'))
        window.open(`http://maps.google.com?q=${data[1].lat}, ${data[1].lng}`, '_blank')
    })
    // ROUTE SYSTEM
    const route = document.getElementById('btn_gaan')
    route.addEventListener('click', e => {
        if (routeWay.length) {
            routeWay.forEach(route => {
                map.removeControl(route);
            })
            routeWay = []
        }
        jefMarkers.forEach(el => {
            map.removeLayer(el)
        })
        const btn = document.getElementsByName('btn')
        btn.forEach(btn => {
            btn.disabled = true
        })
        const data = JSON.parse(localStorage.getItem('pos'))
        let routeMaker = L.Routing.control({
            draggableWaypoints: false,
            lineOptions: {
                addWaypoints: false,
                styles: [{
                    color: 'red',
                    opacity: 1,
                    weight: 6
                }]
            },
            createMarker: function () {
                return null;
            },
            waypoints: [
                L.latLng(userPosition[0], userPosition[1]),
                L.latLng(data[1].lat, data[1].lng)
            ],
        }).on('routesfound', function (e) {
            map.fitBounds([
                [userPosition[0], userPosition[1]],
                [data[1].lat, data[1].lng]
            ]);
            parkMarkers.forEach(data => {
                if (data.options.customId !== park.attributes.OBJECTID) {
                    map.removeLayer(data)
                }
            })
            const mToKm = Math.round(e.routes[0].summary.totalDistance / 100) / 10
            const sToMin = Math.floor(e.routes[0].summary.totalTime / 60);
            main_popup.innerHTML = ` <div class="popup-content">
            <div class="routeData">
            <h2> ${park.attributes.NAAMLABEL} - ${park.attributes.TYPE}</h2>
                <p>${park.attributes.STRAATNAAMLABEL}, ${park.attributes.POSTCODE} Antwerpen</p>

            </div>
             <div class="info_route">
             <p>${mToKm} km</p>
             <p>${sToMin} minuten</p>
            </div>
            <div class="stop">
                <button id="stop">Stop</button>
            </div>
        </div>`
            const stop = document.getElementById('stop')
            stop.addEventListener('click', e => {
                const btn = document.getElementsByName('btn')
                btn.forEach(btn => {
                    btn.disabled = false
                })
                main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 500);

                routeWay.forEach(route => {
                    map.removeControl(route);
                })
                routeWay = []
                main_popup.innerHTML = ""
                let markerGroup = new L.FeatureGroup();
                parkMarkers.forEach(el => {
                    markerGroup.addLayer(el)
                    markerGroup.addTo(map);
                })

                let markerGroup2 = new L.FeatureGroup();
                jefMarkers.forEach(el => {
                    markerGroup2.addLayer(el)
                    markerGroup2.addTo(map);
                })
                map.fitBounds(markerGroup.getBounds());
            })

        }).addTo(map);
        routeMaker.hide()
        routeWay.push(routeMaker)
    })
    const close_btn = document.querySelector('.close-btn');
    close_btn.addEventListener('click', () => {
        main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);
    });

    const like = document.getElementById('like')

    like.addEventListener('click', e => {
        const data = JSON.parse(localStorage.getItem('pos'))
        if (localStorage.getItem('token')) {
            let token
            let base64Url = localStorage.getItem('token').split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            token = JSON.parse(jsonPayload);
            let likedPlace = {
                likeId: park.attributes.OBJECTID,
                userId: token.id,
                name: park.attributes.NAAMLABEL,
                adress: park.attributes.STRAATNAAMLABEL,
                type: "Park",
                lat: data[1].lat,
                long: data[1].lng,
            }
            fetch("https://jef-api.onrender.com/like", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        token: localStorage.getItem('token')

                    },
                    body: JSON.stringify(likedPlace)
                })
                .then(res => res.json())
                .then(data => {
                    alert(data.message)
                })
        } else {
            alert('connect to like')
        }

    })

    checkLike()


}


function renderBusData(bus) {
    console.log(bus)
    main_popup.innerHTML = ""
    main_popup.innerHTML = ` <div class="popup-content">
    <span class="close-btn">&times;</span>
    <div class="naam">
        <h2>${bus.properties.NAAMHALTE} - ${bus.properties.NAAMGEM}</h2>
    </div>
    
    <div id = "invisible" class="info">
    <div class="info_leeftijd">
        <p>Antwerpen</p>
    </div>
    
</div>
<div class="hearth">
<button value = ${bus.properties.STOPID} id="like"><img id="like_img" src="img/like.png"></button>
</div>
<div class="like-go">
<button id="btn_gaan">Route</button>
<button id="redirect"><img src="img/google_maps_white.png" alt="google maps""></button></button>

</div>
</div>`

    const redirect = document.getElementById('redirect')
    redirect.addEventListener("click", e => {
        const data = JSON.parse(localStorage.getItem('pos'))
        window.open(`http://maps.google.com?q=${data[1].lat}, ${data[1].lng}`, '_blank')
    })
    const inv = document.getElementById('invisible')
    inv.style.visibility = 'hidden'
    const route = document.getElementById('btn_gaan')
    route.addEventListener('click', e => {
        if (routeWay.length) {
            routeWay.forEach(route => {
                map.removeControl(route);
            })
            routeWay = []
        }
        const btn = document.getElementsByName('btn')
        btn.forEach(btn => {
            btn.disabled = true
        })
        jefMarkers.forEach(el => {
            map.removeLayer(el)
        })
        const data = JSON.parse(localStorage.getItem('pos'))
        let routeMaker = L.Routing.control({
            draggableWaypoints: false,
            lineOptions: {
                addWaypoints: false,
                styles: [{
                    color: 'red',
                    opacity: 1,
                    weight: 6
                }]
            },
            createMarker: function () {
                return null;
            },
            waypoints: [
                L.latLng(userPosition[0], userPosition[1]),
                L.latLng(data[1].lat, data[1].lng)
            ],
        }).on('routesfound', function (e) {
            map.fitBounds([
                [userPosition[0], userPosition[1]],
                [data[1].lat, data[1].lng]
            ]);

            busMarkers.forEach(data => {
                if (data.options.customId !== bus.properties.STOPID) {
                    map.removeLayer(data)
                }
            })
            const mToKm = Math.round(e.routes[0].summary.totalDistance / 100) / 10
            const sToMin = Math.floor(e.routes[0].summary.totalTime / 60);
            main_popup.innerHTML = ` <div class="popup-content">
    <div class="routeData">
        <h2>${bus.properties.NAAMHALTE} - ${bus.properties.NAAMGEM}</h2>
        </div>
         <div class="info_route">
         <p>${mToKm} km</p>
         <p>${sToMin} minuten</p>
        </div>
        <div class="stop">
            <button id="stop">Stop</button>
        </div>
    </div>`
            const stop = document.getElementById('stop')
            stop.addEventListener('click', e => {
                const btn = document.getElementsByName('btn')
                btn.forEach(btn => {
                    btn.disabled = false
                })
                main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 500);

                routeWay.forEach(route => {
                    map.removeControl(route);
                })
                routeWay = []
                main_popup.innerHTML = ""
                let markerGroup = new L.FeatureGroup();
                busMarkers.forEach(el => {
                    markerGroup.addLayer(el)
                    markerGroup.addTo(map);
                })

                let markerGroup2 = new L.FeatureGroup();
                jefMarkers.forEach(el => {
                    markerGroup2.addLayer(el)
                    markerGroup2.addTo(map);
                })
                map.fitBounds(markerGroup.getBounds());
            })
        }).addTo(map);
        routeMaker.hide()
        routeWay.push(routeMaker)
    })
    const close_btn = document.querySelector('.close-btn');
    close_btn.addEventListener('click', () => {
        main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);


    });

    const like = document.getElementById('like')
    like.addEventListener('click', e => {
        console.log('click')
        if (localStorage.getItem('token')) {
            let token
            let base64Url = localStorage.getItem('token').split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            token = JSON.parse(jsonPayload);
            let likedPlace = {
                likeId: bus.properties.STOPID,
                userId: token.id,
                name: bus.properties.NAAMHALTE,
                type: "Halte",
                lat: bus.geometry.coordinates[1],
                long: bus.geometry.coordinates[0],
            }
            fetch("https://jef-api.onrender.com/like", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        token: localStorage.getItem('token')

                    },
                    body: JSON.stringify(likedPlace)
                })
                .then(res => res.json())
                .then(data => {
                    alert(data.message)
                })
        } else {
            alert('connect to like')
        }

    })
    checkLike()

}

function renderToiletData(findToilet) {
    console.log(findToilet)
    let uur
    if (findToilet.attributes.OPENINGSUREN_OPM == null) {
        uur = ` <p>Uur: /</p>`
    } else {
        uur = ` <p>Uur: ${findToilet.attributes.OPENINGSUREN_OPM}</p>`
    }
    main_popup.innerHTML = ""
    main_popup.innerHTML = `<div class="popup-content">
    <span class="close-btn">&times;</span>
    <div class="naa">
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
    <div class="hearth">
    <button value = ${findToilet.attributes.OBJECTID} id="like"><img id="like_img" src="img/like.png"></button>
    </div>
    <div class="like-go">
    <button id="btn_gaan">Gaan</button>
    <button id="redirect"><img src="img/google_maps_white.png" alt="google maps""></button></button>
    </div>
</div>
</div>`

    const redirect = document.getElementById('redirect')
    redirect.addEventListener("click", e => {
        const data = JSON.parse(localStorage.getItem('pos'))
        window.open(`http://maps.google.com?q=${data[1].lat}, ${data[1].lng}`, '_blank')
    })

    const route = document.getElementById('btn_gaan')
    route.addEventListener('click', e => {
        if (routeWay.length) {
            routeWay.forEach(route => {
                map.removeControl(route);
            })
            routeWay = []
        }
        jefMarkers.forEach(el => {
            map.removeLayer(el)
        })
        const btn = document.getElementsByName('btn')
        btn.forEach(btn => {
            btn.disabled = true
        })
        const data = JSON.parse(localStorage.getItem('pos'))
        let routeMaker = L.Routing.control({
            draggableWaypoints: false,
            lineOptions: {
                addWaypoints: false,
                styles: [{
                    color: 'red',
                    opacity: 1,
                    weight: 6
                }]
            },
            createMarker: function () {
                return null;
            },
            waypoints: [
                L.latLng(userPosition[0], userPosition[1]),
                L.latLng(data[1].lat, data[1].lng)
            ],
        }).on('routesfound', function (e) {
            map.fitBounds([
                [userPosition[0], userPosition[1]],
                [data[1].lat, data[1].lng]
            ]);
            toiletMarkers.forEach(data => {
                if (data.options.customId !== findToilet.attributes.OBJECTID) {
                    map.removeLayer(data)
                }
            })
            const mToKm = Math.round(e.routes[0].summary.totalDistance / 100) / 10
            const sToMin = Math.floor(e.routes[0].summary.totalTime / 60);
            main_popup.innerHTML = ` <div class="popup-content">
    <div class="routeData">
    <h2>${findToilet.attributes.OMSCHRIJVING}</h2>
    <p>${findToilet.attributes.STRAAT} ${findToilet.attributes.HUISNUMMER}, ${findToilet.attributes.POSTCODE} Antwerpen</p>

    </div>
     <div class="info_route">
     <p>${mToKm} km</p>
     <p>${sToMin} minuten</p>
    </div>
    <div class="stop">
        <button id="stop">Stop</button>
    </div>
</div>`
            const stop = document.getElementById('stop')
            stop.addEventListener('click', e => {
                const btn = document.getElementsByName('btn')
                btn.forEach(btn => {
                    btn.disabled = false
                })
                main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
                setTimeout(() => {
                    popup.style.display = 'f;e';
                }, 500);

                routeWay.forEach(route => {
                    map.removeControl(route);
                })
                routeWay = []
                main_popup.innerHTML = ""
                let markerGroup = new L.FeatureGroup();
                toiletMarkers.forEach(el => {
                    markerGroup.addLayer(el)
                    markerGroup.addTo(map);
                })

                let markerGroup2 = new L.FeatureGroup();
                jefMarkers.forEach(el => {
                    markerGroup2.addLayer(el)
                    markerGroup2.addTo(map);
                })
                map.fitBounds(markerGroup.getBounds());
            })
        }).addTo(map);
        routeMaker.hide()
        routeWay.push(routeMaker)
    })

    const close_btn = document.querySelector('.close-btn');
    close_btn.addEventListener('click', () => {
        main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 500);


    });


    const like = document.getElementById('like')
    like.addEventListener('click', e => {
        console.log('click')
        if (localStorage.getItem('token')) {
            let token
            let base64Url = localStorage.getItem('token').split('.')[1];
            let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            token = JSON.parse(jsonPayload);
            let likedPlace = {
                likeId: findToilet.attributes.OBJECTID,
                userId: token.id,
                adress: findToilet.attributes.STRAAT,
                name: findToilet.attributes.OMSCHRIJVING,
                type: "Toilet",
                lat: findToilet.geometry.y,
                long: findToilet.geometry.x
            }
            fetch("https://jef-api.onrender.com/like", {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json",
                        token: localStorage.getItem('token')

                    },
                    body: JSON.stringify(likedPlace)
                })
                .then(res => res.json())
                .then(data => {
                    alert(data.message)
                })
        } else {
            alert('connect to like')
        }

    })
    checkLike()

}

if (localStorage.getItem('likedPlace')) {

    setTimeout(async () => {
        const data = await JSON.parse(localStorage.getItem('likedPlace'))
        const pos = await JSON.parse(localStorage.getItem('userPos'))
        if (routeWay.length) {
            routeWay.forEach(route => {
                map.removeControl(route);
            })
            routeWay = []
        }
        const btn = document.getElementsByName('btn')
        btn.forEach(btn => {
            btn.disabled = true
        })
        let routeMaker = await L.Routing.control({
            draggableWaypoints: false,
            lineOptions: {
                addWaypoints: false,
                styles: [{
                    color: 'red',
                    opacity: 1,
                    weight: 6
                }]
            },
            waypoints: [
                L.latLng(pos.lat, pos.long),
                L.latLng(data.lat, data.long)
            ],
        }).on('routesfound', async function (e) {
            await map.fitBounds([
                [pos.lat, pos.long],
                [data.lat, data.long]
            ]);
            popup.style.display = 'flex';
            main_popup.style.cssText = 'animation:slide-in .5s ease; animation-fill-mode: forwards;';
            const mToKm = Math.round(e.routes[0].summary.totalDistance / 100) / 10
            const sToMin = Math.floor(e.routes[0].summary.totalTime / 60);
            main_popup.innerHTML = ` <div class="popup-content">
        <div class="routeData">
        <h2>${data.name}</h2>
        </div>
         <div class="info_route">
         <p>${mToKm} km</p>
         <p>${sToMin} minuten</p>
        </div>
        <div class="stop">
            <button id="stop">Stop</button>
        </div>
        </div>`
            const stop = document.getElementById('stop')
            stop.addEventListener('click', e => {
                localStorage.removeItem('likedPlace')
                localStorage.removeItem('userPos')
                const btn = document.getElementsByName('btn')
                btn.forEach(btn => {
                    btn.disabled = false
                })
                main_popup.style.cssText = 'animation:slide-out .5s ease; animation-fill-mode: forwards;';
                setTimeout(() => {
                    popup.style.display = 'none';
                }, 500);

                routeWay.forEach(route => {
                    map.removeControl(route);
                })
                routeWay = []
                main_popup.innerHTML = ""
            })
        }).addTo(map);
        routeMaker.hide()
        routeWay.push(routeMaker)
    }, 500);


}

function checkLike() {
    if (localStorage.getItem('token')) {
        let token
        let base64Url = localStorage.getItem('token').split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        token = JSON.parse(jsonPayload);
        const like = document.getElementById('like')
        const container = document.querySelector("div.hearth")
        fetch(`https://jef-api.onrender.com/like/${token.id}`)
            .then(res => res.json())
            .then(data => {
                data.data.forEach(el => {

                    if (like.value == el.likeId) {
                        container.innerHTML = `    <button id="filled"><img id="like_img" src="img/heart_filled.png"></button>`
                    }

                })
            })
    }
}

async function getToiletData() {

    const res = await fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek1/MapServer/8/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    return await res.json()
}


async function getJefData() {

    const res = await fetch('./locaties.json')
    return await res.json()
}

async function getTransportData() {

    const res = await fetch('https://geo.api.vlaanderen.be/Haltes/ogc/features/collections/Halte/items?f=application%2Fjson&limit=50')
    return await res.json()
}

async function getParkData() {

    const res = await fetch('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek6/MapServer/758/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    return await res.json()
}

async function getRestoData() {

    const res = await fetch('./resto.json')
    return await res.json()
}


async function getLatLng(adress) {
    const res = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${adress}&apiKey=12f87eced5374ab7a9ce955d08aa8893`)
    return await res.json()
}