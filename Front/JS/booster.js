// Le tableau "characters" contient l'ensemble des noms de personnage
const characters = ["Harry-Potter", "Ron-Weasley", "Draco-Malfoy", "Hermione-Granger", "Minerva-McGonagall", "Severus-Snape", "Albus-Dumbledore", "Lord-Voldemort", "Sirius-Black", "Bellatrix-Lestrange", "Neville-Longbottom", "Cedric-Diggory", "Gregory-Goyle", "Vincent-Crabbe", "Gilderoy-Lockhart", "Luna-Lovegood", "Cho-Chang", "Lucius-Malfoy", "Doloress-Umbridge", "Alastor-Moody", "Nymphadora-Tonks", "Remus-Lupin", "Fred-Weasley", "George-Weasley", "Ginny-Weasley", "Quirinus-Quirrel", "Rubeus-Hagrid", "Peter-Pettigrew", "Viktor-Krum", "Fleur-Delacour"]

// Le dictionnaire "houses" contient la liste des 4 maisons (+ une exeption si le personnage n'a pas de maison) avec un code hex en valeur pour chacune d'entre elle
const houses = {
    "Gryffindor" : "#740001",
    "Slytherin" : "#1a472a",
    "Hufflepuff" : "#f0c75c",
    "Ravenclaw" : "#0e1a40",
    "" : "gray"
}

const booster = document.querySelector(".openBooster")
const card = document.querySelector(".card")
const next = document.querySelector(".next") 

booster.addEventListener("click", () => {
    if (Date.now() - localStorage.getItem("openBooster") > 86400000 || !localStorage.getItem("openBooster")) {
        booster.style.display = "none"
        card.style.display = "block"
        nextCard(0)
    } else {
        document.querySelector(".canOpenBooster").innerHTML = `<h2 class="canOpenBooster">Attendez demain</h2>`
    }
})

card.addEventListener("click", () => {
    index += 1
    nextCard(index)
})

openBooster =  () => {
    let container = []
    
    for (i=0; i<5; i++) {
        const random = Math.floor(Math.random() * characters.length)
        const character = characters[random]
        container.push(character)
    }
    return container
}

const content = openBooster()
let index = 0

nextCard = async (number) => {
    if (number >= 5) {
        card.style.background = "goldenrod"
        card.innerHTML = `
            <h2>End</h2>
        `
        localStorage.setItem("openBooster", Date.now())
        window.location.href = "../HTML/booster.html"
    } else {
        const data = await fetch("https://hp-api.lainocs.fr/characters/" + content[number]).then(r => r.json())
        card.style.background = houses[data.house]
        card.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.image}" id="characterImg" alt="">
        `
        const response = await fetch("http://127.0.0.1:3000/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: "Cards",
                content: content[index],
                authorId: localStorage.getItem("userId")
            }),
        });
      
        if (response.ok) {
            const result = await response.json();
            console.log(result)
        }
    }
}