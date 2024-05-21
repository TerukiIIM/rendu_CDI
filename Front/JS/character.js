let params = new URLSearchParams(document.location.search);
let slug = params.get("slug");

fetch("https://hp-api.lainocs.fr/characters/" + slug).then(r => r.json().then(e => { 
    document.getElementById("characterName").innerHTML = e.name
    
    const date = new Date(e.birthday)
    document.getElementById("characterBirthday").innerHTML += date.toDateString()
    document.getElementById("characterBlood").innerHTML += e.blood
    document.getElementById("characterEyes").innerHTML += e.eyes
    document.getElementById("characterHairs").innerHTML += e.hairs

    document.getElementById("characterRole").innerHTML += e.role
    document.getElementById("characterHouse").innerHTML += (e.house == "" ? "Other" : e.house )
    document.getElementById("characterPatronus").innerHTML += (e.patronus == "" ? "None" : e.patronus)
    document.getElementById("characterWand").innerHTML += (e.wand == "" ? "Unknown" : e.wand)

    document.getElementById("characterActor").innerHTML += e.actor

    document.getElementById("characterImg").innerHTML += `<img src="${e.image}" alt="characterImg">`
}))
