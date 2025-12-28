const prisma = require('../config/prisma')

const getPostComments = async (req, res) => {
    const postId = Number(req.params.postId)

    const comments = await prisma.comment.findMany({
        where: { postId: postId },
        orderBy: { createdAt: 'desc' }
    })

    res.json(comments)
}

const deleteComment = async (req, res) => {
    const commentId = Number(req.params.commentId)
    const userId = req.user.id

    const comment = await prisma.comment.findUnique({
        where: { id: commentId }
    });

    if (comment.authorId !== userId) {
        return res.status(403).json({ message: "You can only delete your own comments" });
    }

    await prisma.comment.delete({
        where: { id: commentId }
    })

    res.json({ message: "Comment deleted successfully" });
}

const editComment = async (req, res) => {
    const commentId = Number(req.params.commentId)
    const userId = req.user.id
    const { content } = req.body

    const comment = await prisma.comment.findUnique({
        where: { id: commentId }
    });

    if (comment.authorId !== userId) {
        return res.status(403).json({ message: "You can only edit your own comments" });
    }

    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    await prisma.comment.update({
        where: { id: commentId },
        data: { content }
    })

    res.json({ message: "Comment edited successfully" })
}

module.exports = {
    getPostComments,
    deleteComment,
    editComment
}