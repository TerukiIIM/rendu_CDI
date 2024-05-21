const express = require("express")
const cors = require("cors")

const ip = require("ip")
const bodyParser = require("body-parser")

const prisma = require("./Config/prisma")

const app = express()
const port = 3000
    const ipAddress = ip.address()

app.use(cors())

// app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", require("./Routes/start")) 

app.get("/house", (req, res) => {
    prisma.house.findUnique({
        where: {
            id: 1
        }
    }).then((e) => {res.json({ message : e.house })})
    .catch((e) => res.json({ message : e }))  
})
  
app.post("/house", (req, res) => {
    let house = req.body;
    prisma.house.update({
    where: {
        id: 1
    },
    data: house
    }).then((e) => {res.json({ message : e.house })})
    .catch((e) => res.json({ message : e }))  
})

const initApp = () => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
        console.log(`http://${ipAddress}:${port}`)
    })
}

initApp()