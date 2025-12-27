const prisma = require('../config/prisma')

const getPostComments = async (req, res) => {
    const postId = req.params.postId

    const comments = await prisma.comment.findMany({
        where: { postId: postId },
        orderBy: { createdAt: 'desc' }
    })

    res.json(comments)
}

const deleteComment = async (req, res) => {
    const commentId = req.params.commentId

    const comment = await prisma.comment.delete({
        where: { id: commentId }
    })

    res.json(comment)
}

const editComment = async (req, res) => {
    const commentId = req.params.commentId
    const { content } = req.body

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