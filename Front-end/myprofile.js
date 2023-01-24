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
    <div class="like">
        <div class="type">
            <img src="./img/eten.png" alt="">
        </div>
        <div class="name">
            <p>Mc Dondald's</p>
        </div>
        <div class="delete">
            <img src="./img/cross.png" alt="kruis">
        </div>
        <div class="button_gaan">
            <button type="button">Gaan</button>
        </div>
    </div>


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