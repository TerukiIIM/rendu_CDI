// [ REGISTER / LOGIN ] //
const loginLink = document.querySelector(".loginLink")
const registerLink = document.querySelector(".registerLink")
const register = document.querySelector(".register")

// Passer sur la registration page
registerLink.addEventListener("click", () => {
    register.classList.add("active")
})

// Passer sur la login page (si l'utilisateur est sur la registration page)
loginLink.addEventListener("click", () => {
    register.classList.remove("active")
})

// [ NODEJS ] //
// Register verification
const login = document.querySelector(".loginForm")
const userEmail = document.getElementById("userEmail")  
const userPassword = document.getElementById("userPassword")

const registration = document.querySelector(".registrationForm")
const email = document.getElementById("email")  
const name = document.getElementById("name")  
const password = document.getElementById("password")
login.addEventListener("submit", async (event) => {
  event.preventDefault()

  const response = await fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail.value,
      password: userPassword.value,
    }),
  })

  if (response.ok) {
    const result = await response.json()
    const token = result.token
    localStorage.setItem("email", userEmail.value)
  
    localStorage.setItem("token", token)
    window.location.href = "../HTML/profile.html"
  }
})

registration.addEventListener("submit", async (event) => {
  event.preventDefault()

  const response = await fetch("http://127.0.0.1:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      name: name.value,
      password: password.value,
    }),
  })

  if (response.ok) {
    window.location.href = "../HTML/login.html"
  }
})

if (localStorage["email"] != undefined) {
  userEmail.value = localStorage.getItem("email")
}