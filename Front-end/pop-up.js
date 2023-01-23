"use strict"

const eerstebezoek = localStorage.getItem("firstVisit");
const explenation = document.querySelector(".explenation");
const information = document.querySelector(".pop-up-home");
const doorgaanConsole = document.querySelector("#doorgaanConsole");

if (eerstebezoek == "no") {
 removeConsole();
}



doorgaanConsole.addEventListener("click", removeConsole);



function removeConsole() {
    explenation.style.display = "none";
    information.style.display = "none";

}

localStorage.setItem("firstVisit", "no");