// Login verification
const title = document.getElementById("userName")
const useremail = document.getElementById("userEmail")
const userCreate = document.getElementById("userCreate")

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

    const user = await response.json()

    localStorage.setItem("userId", user.user.id)

    title.innerHTML = user.user.name
    useremail.innerHTML = user.user.email
    fetchCard()
}

fetchUser()

fetchCard = async () => {
    const allCards = await fetch("http://127.0.0.1:3000/post").then(r => r.json())
    const cards = document.querySelector(".userCards")

    allCards.forEach(async card => {
        if (card.authorId == localStorage.getItem("userId")) {
            const data = await fetch("https://hp-api.lainocs.fr/characters/" + card.content).then(r => r.json())
            cards.innerHTML += `
            <div class="userCard">
                <div class="description">
                    <div class="text">
                        <div class="name">
                            <h3>${data.name}</h3>
                        </div>
    
                        <div class="house">
                            <h3>${data.role} (${data.house == "" ? "Other" : data.house})</h3>
                        </div>
                    </div>
    
                    <div class="favorite">
                        <i class="fa fa-heart"></i>
                    </div>
                </div>
                
                <div class="characterImage" id="${data.slug}">
                    <img src="${data.image}" alt="characterImage" class="characterImage">
                </div>
            </div>
            `
        }
    });
}
