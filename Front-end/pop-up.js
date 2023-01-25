"use strict"

const eerstebezoek = localStorage.getItem("firstVisit");
const expiration = localStorage.getItem("expiration");
const explenation = document.querySelector(".explenation2");
const information = document.querySelector(".pop-up-home");
const information2 = document.querySelector(".pop-up-home2");
const doorgaanConsole = document.querySelector("#doorgaanConsole");
const doorgaanConsole2 = document.querySelector("#doorgaanConsole2");

// hide second pop-up def
information2.style.display = "none";

// check if expiration date exists
if (expiration) {
    const currentDate = new Date();
    if (currentDate > new Date(expiration)) {
        // remove the "firstVisit" key and the "expiration" key 
        localStorage.removeItem("firstVisit");
        localStorage.removeItem("expiration");
    }
}

if (eerstebezoek == "Not firstVisit") {
    removeConsole();
}

doorgaanConsole.addEventListener("click", function(){
    // hide first pop-up
    information.style.display = "none";
    // show second pop-up
    information2.style.display = "block";
});

doorgaanConsole2.addEventListener("click", removeConsole);

function removeConsole() {
    explenation.style.display = "none";
    information.style.display = "none";
    information2.style.display = "none";
    // 30 days till expirationDate
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    localStorage.setItem("expiration", expirationDate);
    localStorage.setItem("firstVisit", "Not firstVisit");
}

