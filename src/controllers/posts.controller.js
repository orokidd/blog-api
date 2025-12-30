const prisma = require('../config/prisma')

const getAllPosts = async (req, res) => {
    const posts = await prisma.post.findMany();

    res.json(posts)
}

const getAllPublishedPosts = async (req, res) => {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' }
    })

    res.json(posts)
}

const getPostById = async (req, res) => {
    const postId = req.params.postId
    
    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    res.json(post)
}

const newPost = async (req, res) => {
    const { title, content, published } = req.body
    const userId = req.user.id

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }
    
    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId: Number(userId),
            published: published || false
        }
    })

    res.json(post)
}

const deletePost = async (req, res) => {
    const postId = req.params.postId

    const post = await prisma.post.delete({
        where: { id: postId }
    })

    res.json(post)
}

const editPost = async (req, res) => {
    const { title, content, published } = req.body
    const userId = req.user.id

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    const post = await prisma.post.update({
        where: { id: postid },
        data: {
            title,
            content,
            authorId: Number(userId),
            published: published || false,
            updated: true
        }
    })

    res.json(post)
}

module.exports = {
    getAllPosts,
    getAllPublishedPosts,
    getPostById,
    newPost,
    deletePost,
    editPost
}