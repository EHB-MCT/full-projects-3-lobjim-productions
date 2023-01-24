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
                alert(data.message)
                window.location.href = "login.html"
            } else {
                await alert(data.message)

            }
        })
    } else {
        alert("Password does not match !")
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
            alert(data.message)
            window.location.href = 'home.html'
        } else if (data.status == 400) {
            alert(data.message)
        }
    })
})

async function sendData(user) {

    let res = await fetch("http://localhost:2000/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    return await res.json()
}


async function connection(credentials) {
    let res = await fetch("http://localhost:2000/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    return await res.json()
}