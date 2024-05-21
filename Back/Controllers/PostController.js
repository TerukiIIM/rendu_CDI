const prisma = require("../Config/prisma")

class PostController {
    async index(req, res) {
        try {
            const posts = await prisma.post.findMany()
            return res.status(200).json(posts)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async store(req, res) {
        const body = req.body

        try {
            const post = await prisma.post.create({
                data: {
                    title: body.title,
                    content: body.content,
                    author: { connect: { id: Number(body.authorId) } },
                },
            })
            return res.status(201).json(post)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async show(req, res) {
        try {
            const id = req.params.id
            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    author: true,
                },
            })

            if (!post)
                return res.status(404).json({ message: "Post not found" })

            return res.status(200).json(post)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id
            const body = req.body
            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id),
                },
            })

            if (!post)
                return res.status(404).json({ message: "Post not found" })

            const updatedPost = await prisma.post.update({
                where: {
                    id: Number(id),
                },
                data: body,
            })

            return res.status(200).json(updatedPost)
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id),
                },
            })

            if (!post)
                return res.status(404).json({ message: "Post not found" })

            await prisma.post.delete({
                where: {
                    id: Number(id),
                },
            })

            return res.status(204).json()
        } catch (e) {
            return res.status(500).json({ message: e.message })
        }
    }
}

module.exports = new PostController()
