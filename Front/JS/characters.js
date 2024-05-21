let characters = document.querySelector(".characters")

const houses = {
    "Gryffindor" : "#740001",
    "Slytherin" : "#1a472a",
    "Hufflepuff" : "#f0c75c",
    "Ravenclaw" : "#0e1a40",
    "" : "lightgray"
}

displayAllCharacters = async () => {
    const data = await fetch("https://hp-api.lainocs.fr/characters/").then(r => r.json())
    
    data.forEach(function(character) {
        characters.innerHTML += 
        `<div class="character" id="${character.house}">
            <div class="description">
                <div class="text">
                    <div class="name">
                        <h3>${character.name}</h3>
                    </div>

                    <div class="house">
                        <h3>${character.role} (${character.house == "" ? "Other" : character.house})</h3>
                    </div>
                </div>

                <div class="favorite">
                    <i class="fa fa-heart"></i>
                </div>
            </div>
            
            <div class="characterImage" id="${character.slug}" style="background: ${houses[character.house]}">
                <img src="${character.image}" alt="characterImage" class="characterImage">
            </div>
        </div>`
    })

    const favorites = document.querySelectorAll(".favorite")

    favorites.forEach(function(favorite) {
        favorite.addEventListener("click", () => {
            if (favorite.style.color != "red") {
                favorite.style.color = "red"
            } else {
                favorite.style.color = "white"
            }
        })
    })

    filter()
}

addClick = async () => {
    await displayAllCharacters()
    let characters = document.querySelectorAll(".characterImage")

    characters.forEach(function(character) {
        character.addEventListener("click", function() {
            window.location.href = "./character.html?slug=" + character.getAttribute("id")
        })
    })
}

addClick()

search = () => {
    const searchBox = document.getElementById("searchItem").value.toUpperCase()
    const charactersList = document.getElementById("charactersList")
    const character = document.querySelectorAll(".character")
    const characterName = charactersList.getElementsByTagName("h3")

    for (i=0; i < characterName.length; i++) {
        let match = character[i].getElementsByTagName("h3")[0]

        if (match) {
            let textValue = match.textContent || match.innerHTML

            if (textValue.toUpperCase().indexOf(searchBox) > -1) {
                character[i].style.display = ""
            } else {
                character[i].style.display = "none"
            }
        }
    }
}

filter = () => {
    const filters = document.querySelectorAll(".filterList li")
    const characters = document.querySelectorAll(".character")

    filters.forEach(function(filter) {
        filter.addEventListener("click", function() {
            document.querySelector(".filterList .active").classList.remove("active")
            filter.classList.add("active")

            characters.forEach(function(character) {
                if (character.getAttribute("id") == filter.textContent || filter.textContent == "All" || (character.getAttribute("id") == "" && filter.textContent == "Other") ) {
                    character.classList.remove("hidden")
                } else {
                    character.classList.add("hidden")
                }
            });

        })
    });
}