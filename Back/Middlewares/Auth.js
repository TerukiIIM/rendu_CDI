const jwt = require("jsonwebtoken");
const prisma = require("../Config/prisma");

authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log("Authenticating token: ", token);

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }

        const email = payload.data;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) return res.sendStatus(403);

        req.user = user;

        next();
    });
}

module.exports = { authenticateToken };
