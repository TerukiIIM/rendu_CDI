const fetchUser = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
        window.location.href = "../HTML/login.html"
        return
    }

    const response = await fetch(`http://127.0.0.1:3000/getMyProfile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

    if (response.status === 401) {
        window.location.href = "../HTML/login.html"
        return
    } else if (response.status === 403) {
        window.location.href = "../HTML/login.html"
        return
    }
}

// [SCROLL TO TOP] //
const nav = document.querySelector("nav")
const btn = document.querySelector(".scrollToTopBtn");

window.onscroll = function () {scrollFunction()};

// La fonction "scrollFunction" Verifie si l'utilisateur a assez scroll vers le bas afin :
// d'afficher le bouton "scroll to top" et faire disparaitre la navbar si les conditions sont replies
// d'afficher la navbar et faire disparaitre le bouton "scroll to top" si l'utilisateur revient en haut de la page
scrollFunction = () => {
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        btn.style.display = "block";
        nav.style.top = "-100px";
    } else {
        btn.style.display = "none";
        nav.style.top = "0px";
    }
}

// La fonction "topFunction" permet de remonter en haut de la page, celui-ci est activé lorsque l'utilisateur cliquer sur le bouton "scroll to top"
topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// [ MENU HAMBURGER ] //
const menu = document.querySelector(".menu");
const navLinks = document.querySelector(".navLinks");

// La fonction "changeMenuIcon" permet de changer l'icon du menu hamburger (menu hamburger ou croix)
changeMenuIcon = (icon) => {
    icon.classList.toggle("fa-times")
}

// Les lignes ci-dessous permettent d'afficher ou non le menu hamburger
menu.addEventListener("click", () => {
    navLinks.classList.toggle("mobileMenu");
    
    if (body.style.overflow != "hidden") {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "visible";
    }
})

// [ DARKMODE ] //
const darkMode = document.querySelector(".darkMode");
const body = document.querySelector("body");

// La fonction "changeMenuIcon" permet de changer l'icon du darkmode (soleil ou lune)
changeModeIcon = (icon) => {
    icon.classList.toggle("fa-moon")
}

let mode = sessionStorage.getItem("darkMode")

// Les lignes ci-dessous permettent d'initialiser la clé "darkMode" dans le stockage de session
// Si la valeur de la clé "darkMode" est égale à "true", alors il applique le darkmode sinon il laisse la page ne clearmode
if (!sessionStorage.getItem("darkMode")) {
    sessionStorage.setItem("darkMode", "false")
} else 
    if(mode == "true") {
        body.style.background = "rgba(0, 0, 0, 0.9)";
        body.classList.toggle("darkMode");
}

// Les lignes ci-dessous permettent de basculer entre le darkmode et le clearmode
// La ligne sessionStorage.setItem("darkMode", "true") permet de garde la propriété du darkmode lorsque l'utilisateur passe d'une page à une autre
darkMode.addEventListener("click", function () {
    body.classList.toggle("darkMode")
    
    if (body.style.background != "rgba(0, 0, 0, 0.9)") {
        body.style.background = "rgba(0, 0, 0, 0.9)"
        sessionStorage.setItem("darkMode", "true")
    } else {
        body.style.background = "white"
        sessionStorage.setItem("darkMode", "false")
    }
})

// [ REGISTER / LOGIN ] //
const openRegister = document.querySelector(".log")

// Afficher la login page
openRegister.addEventListener("click", () => {
    window.location.href = "../HTML/profile.html"
})

// [ MODAL ] //
const modalContainer = document.querySelector(".modalContainer")
const modalTriggers = document.querySelectorAll(".modalTrigger")

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal(){
    modalContainer.classList.toggle("active")
}