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

    const comment = await prisma.comment.delete({
        where: { id: commentId }
    })

    res.json({ message: "Comment deleted successfully", comment });
}

const editComment = async (req, res) => {
    const commentId = Number(req.params.commentId)
    const { content } = req.body

    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    const comment = await prisma.comment.update({
        where: { id: commentId },
        data: { content }
    })

    res.json(comment)
}

module.exports = {
    getPostComments,
    deleteComment,
    editComment
}