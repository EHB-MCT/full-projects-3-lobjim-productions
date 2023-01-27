const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");

//   js code to show/hide password and change icon
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})

// js code to appear signup and login form
signUp.addEventListener("click", () => {
    container.classList.add("active");
});
login.addEventListener("click", () => {
    container.classList.remove("active");
});


const signup = document.getElementById('registration')
signup.addEventListener('submit', (e) => {
    e.preventDefault()
    const username = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value

    let user = {
        username,
        email,
        password
    }

    if (password == password2) {
        sendData(user).then(async data => {
            if (data.status == 200) {
                await Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Account succesvol aangemaakt',
                    showConfirmButton: false,
                    timer: 2000
                })
                window.location.href = "login.html"
            } else {
                await Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Een fout is opgetreden, probeer opnieuw',
                    showConfirmButton: false,
                    timer: 2000
                })

            }
        })
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Controleer je wachtwoord',
            showConfirmButton: false,
            timer: 2000
        })
    }


})


const signin = document.getElementById('signin')
signin.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('cred_email').value
    const password = document.getElementById('cred_pass').value

    let user = {
        email,
        password
    }

    connection(user).then(async data => {
        if (data.status == 200) {
            localStorage.setItem('token', data.token)
            await Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Succesvol ingelogd',
                showConfirmButton: false,
                timer: 2000
            })
            window.location.href = 'home.html'
        } else if (data.status == 400) {
            await Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Email of wachtwoord is incorrect',
                showConfirmButton: false,
                timer: 2000
            })
        }
    })
})

async function sendData(user) {

    let res = await fetch("https://jef-api.onrender.com/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    return await res.json()
}


async function connection(credentials) {
    let res = await fetch("https://jef-api.onrender.com/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    return await res.json()
}