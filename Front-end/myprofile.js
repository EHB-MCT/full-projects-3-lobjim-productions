let token
if (localStorage.getItem('token')) {
    let base64Url = localStorage.getItem('token').split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    token = JSON.parse(jsonPayload);

    verifyToken().then(data => {
        if (data.message == "You are connected !") {
            renderProfile()
            fetch(`https://jef-api.onrender.com/like/${token.id}`)
                .then(res => res.json())
                .then(data => {
                    data.data.forEach(el => {
                        renderLikedPlaces(el)
                    })
                })
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: data.message,
                showConfirmButton: false,
                timer: 2000
            })
            window.location.href = "login.html"
        }
    })
} else {
    window.location.href = "login.html"

}

async function verifyToken() {

    const res = await fetch('https://jef-api.onrender.com/checkConnection', {
        method: "GET",
        headers: {
            token: localStorage.getItem('token')
        }
    })

    return await res.json()
}

function renderLikedPlaces(data) {
    const container = document.getElementById('liked')
    let html = ""
    let img


    if (data.type == "Park") {
        img = `<img src="./img/park.png" alt="">`
    } else if (data.type == "Halte") {
        img = `<img src="./img/transport.png" alt="">`
    } else if (data.type == "Resto") {
        img = `<img src="./img/eten.png" alt="">`

    } else {
        img = `<img src="./img/wc.png" alt="">`

    }
    html = ` <div class="like">
    <div class="type">
    ${img}
    </div>
    <div class="name">
        <p>${data.name}</p>
    </div>
    <div class="delete" name = "delete">
        <img id = ${data.likeId} src="./img/cross.png" alt="kruis">
    </div>
    <div class="button_gaan">
        <button name = "go"id = ${data.likeId} type="button">Gaan</button>
    </div>
</div>`
    container.innerHTML += html

    const removeLike = document.getElementsByName('delete')
    removeLike.forEach(el => {
        el.addEventListener('click', e => {
            const id = e.target.id
            fetch(`https://jef-api.onrender.com/deleteLike?likeId=${id}&userId=${token.id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': "application/json",
                        token: localStorage.getItem('token')
                    },
                })
                .then(res => res.json())
                .then(async data => {
                    await Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: data.message,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    await location.reload()
                })
        })
    })

    const gaan = document.getElementsByName('go')

    gaan.forEach(el => {
        el.addEventListener('click', e => {
            fetch(`https://jef-api.onrender.com/like/${token.id}`)
                .then(res => res.json())
                .then(data => {
                    const place = data.data.find(el => el.likeId == e.target.id)
                    localStorage.setItem('likedPlace', JSON.stringify(place))
                    window.location.href = "home.html"
                })
        })
    })
}

function renderProfile() {
    const container = document.getElementById('wrapper')
    container.innerHTML = ""

    let html = ''
    html = ` <div class="myprofile">
<div class="myprofile_image">
    <img src="img/profile.png">
</div>
<div class="myprofile_info">
    <h1>${token.username}</h1> <br>
    <p>${token.email}</p>
</div>
</div>
<div class="likedplaces">
<div class="title">
    <h1>Favoriete plekjes</h1>
</div>
<div id = "liked" class="likelist">

</div>

<div class="logout">
    <button type="button" id = "disconnect" >Afmelden</button>
</div>


</div>`
    container.innerHTML = html

    const disconnect = document.getElementById('disconnect')
    disconnect.addEventListener('click', e => {
        localStorage.removeItem('token')
        location.reload()
    })
}