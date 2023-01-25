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
            console.log(token)
            renderProfile()
            fetch(`https://jef-api.onrender.com/like/${token.id}`)
                .then(res => res.json())
                .then(data => {
                    data.data.forEach(el => {
                        console.log(el)
                        renderLikedPlaces(el)
                    })
                })
        } else {
            alert(data.message)
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
        <button id = ${data.likeId} type="button">Gaan</button>
    </div>
</div>`
    container.innerHTML += html

    const removeLike = document.getElementsByName('delete')
    removeLike.forEach(el => {
        el.addEventListener('click', e => {
            const id = e.target.id
            console.log(JSON.stringify(token.id))
            console.log(id)
            fetch(`https://jef-api.onrender.com/deleteLike?likeId=${id}&userId=${token.id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': "application/json",
                        token: localStorage.getItem('token')
                    },
                })
                .then(res => res.json())
                .then(data => {
                    alert(data.message)
                    location.reload()
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
    <h1>Gelikete plaatsen</h1>
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
        console.log('click')
        localStorage.removeItem('token')
        location.reload()
    })
}