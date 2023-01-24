if (!localStorage.getItem('token')) {
    const profile = document.getElementById('profile')
    profile.innerHTML = `<a href="login.html" id="profile">Login</a></li>`
    profile.style.fontWeight = "bold"
    profile.style.color = '#F04E37 !important'
    console.log(profile.textContent)
} else {
    profile.innerHTML = `<a href="myprofile.html" id="profile">Mijn profiel</a></li>`

}