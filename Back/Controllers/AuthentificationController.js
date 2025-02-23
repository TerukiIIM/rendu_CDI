const prisma = require("../Config/prisma")
const { comparePassword } = require("../Utils/bcrypt")
const { generateAccessToken } = require("../Utils/jwt")

class AuthentificationController {
    async login(req, res) {
        try {
            const body = req.body
            
            const user = await prisma.user.findUnique({
                where: {
                    email: body.email,
                },
            })
            
            if (!user) return res.status(404).json({ message: "User not found" })
        
            const isSamePassword = await comparePassword(body.password, user.password)
            
            if (!isSamePassword) return res.status(401).json({ message: "Invalid password" })
            
            const token = generateAccessToken(body.email)
            
            return res.status(200).json({ token })
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async getMyProfile(req, res) {
        return res.status(200).json({ user: req.user })
    }
}

module.exports = new AuthentificationController()
