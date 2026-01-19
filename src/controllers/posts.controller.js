const prisma = require('../config/prisma')

const getAllPosts = async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' }
    });

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
    const id = Number(postId)
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid post id' })

    const post = await prisma.post.findUnique({
        where: { id }
    })

    res.json(post)
}

const searchPostByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "Title query is required" });
    }

    const posts = await prisma.post.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


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
            published: published,
            updated: false
        }
    })

    res.json(post)
}

const deletePost = async (req, res) => {
    const postId = req.params.postId
    const id = Number(postId)
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid post id' })

    const post = await prisma.post.delete({
        where: { id }
    })

    res.json(post)
}

const editPost = async (req, res) => {
    const { title, content, published } = req.body
    const userId = req.user.id

    if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
    }

    const postId = req.params.postId
    const id = Number(postId)
    if (Number.isNaN(id)) return res.status(400).json({ message: 'Invalid post id' })

    const post = await prisma.post.update({
        where: { id },
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
    editPost,
    searchPostByTitle
}