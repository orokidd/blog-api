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
    const postId = req.params.id
    
    const post = await prisma.post.findUnique({
        where: { id: postId }
    })

    res.json(post)
}

const newPost = async (req, res) => {
    const { title, content, authorId, published } = req.body
    
    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId,
            published: published ? true : false,
        }
    })

    res.json(post)
}

const editPost = async (req, res) => {
    const { title, content, authorId, published } = req.body
    const postid = req.params.postId

    const post = await prisma.post.update({
        where: { id: postid },
        data: {
            title,
            content,
            authorId,
            published: published ? true : false,
            updated: true
        }
    })

    res.json(post)
}

exports.module = {
    getAllPosts,
    getAllPublishedPosts,
    getPostById,
    newPost,
    editPost
}