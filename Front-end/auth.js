if (!localStorage.getItem('token')) {
    const profile = document.getElementById('profile')
    profile.innerHTML = `<a href="login.html" id="profile">Login</a></li>`
} else {
    profile.innerHTML = `<a href="myprofile.html" id="profile">Mijn profiel</a></li>`

}